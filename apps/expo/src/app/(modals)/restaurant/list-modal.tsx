import React from "react";
import { useGlobalSearchParams } from "expo-router";

import { AvailableListsList } from "~/components/list/available-lists-list";
import { ListSearchInput } from "~/components/list/list-search-input";
import { ThemeableView } from "~/components/themeable/themable-view";

export default function ListModal(): React.ReactElement {
  const { id } = useGlobalSearchParams();

  const [query, setQuery] = React.useState("");

  return (
    <ThemeableView className="flex h-full flex-col justify-start space-y-2 px-4">
      <ListSearchInput query={query} setQuery={setQuery} />
      <AvailableListsList restaurantId={id as string} query={query} />
    </ThemeableView>
  );
}
