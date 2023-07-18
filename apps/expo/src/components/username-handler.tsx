import React from "react";
import { useUser } from "@clerk/clerk-expo";

import { api } from "~/utils/api";
import { usePersistedStore } from "~/state/persisted";

export function UsernameHandler(): React.ReactElement {
  const { mutate: upsertUser } = api.user.upsert.useMutation();
  const persistedStore = usePersistedStore();

  const { user } = useUser();

  React.useEffect(() => {
    if (!user || !persistedStore.isFirstUsage) return;

    upsertUser({ username: user.username || undefined });
    persistedStore.setIsFirstUsage(false);
  }, [persistedStore, user, upsertUser]);

  return <></>;
}
