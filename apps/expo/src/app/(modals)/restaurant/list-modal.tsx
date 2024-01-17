import React from "react";
import { useGlobalSearchParams, useRouter } from "expo-router";

import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";

export default function ListModal(): React.ReactElement {
  const { id } = useGlobalSearchParams();

  const router = useRouter();

  return (
    <ThemeableView className="flex h-full flex-col justify-start space-y-2 px-4 py-3">
      <ThemeableText>TEST</ThemeableText>
    </ThemeableView>
  );
}
