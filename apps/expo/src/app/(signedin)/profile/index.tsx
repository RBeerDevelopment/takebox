import React from "react";
import { useRouter } from "expo-router";

import { ThemeableView } from "~/components/themeable/themable-view";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ThemeableView className="flex h-full w-full flex-col items-center"></ThemeableView>
  );
}
