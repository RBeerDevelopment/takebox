import React from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import { usePersistedStore } from "~/state/persisted";

export function UsernameHandler(): React.ReactElement {
  const { mutate: upsertUser } = api.user.upsert.useMutation();
  const persistedStore = usePersistedStore();

  const { user } = useUser();

  const router = useRouter();

  React.useEffect(() => {
    if (!user) return;
    if (!user.username || user.username === "") {
      router.replace("/profile/username-setup/modal");
      return;
    }

    if (!persistedStore.isFirstUsage) return;

    upsertUser({ username: user.username || undefined });
    persistedStore.setIsFirstUsage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persistedStore, user]);

  return <></>;
}
