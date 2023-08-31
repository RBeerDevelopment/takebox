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
    console.log({ user, isFirstUsage: persistedStore.isFirstUsage });
    if (!user) return;
    if (!user.username || user.username === "") {
      console.log("replacing username");
      router.replace("/username-setup/modal");
      return;
    }

    if (!persistedStore.isFirstUsage) return;

    console.log("upserting user");
    upsertUser({ username: user.username || undefined });
    persistedStore.setIsFirstUsage(false);
  }, [persistedStore, user]);

  return <></>;
}
