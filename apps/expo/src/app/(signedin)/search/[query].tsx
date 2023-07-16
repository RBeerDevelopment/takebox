import React from "react";
import { View } from "react-native";
import { Link, Stack, useSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { ThemeableText } from "~/components/themeable/themable-text";
import { ThemeableView } from "~/components/themeable/themable-view";
import { ErrorMessage } from "../../../components/error-message";
import { SearchResultsSkeleton } from "../../../components/skeleton";
import { useSearch } from "../../../hooks/use-search";
import { useGeneralStore } from "../../../state";

export default function SearchScreen() {
  const location = useGeneralStore((state) => state.location);

  const { query } = useSearchParams();

  const { restaurants, isFetching, isError } = useSearch(
    query as string | undefined,
    location?.coords.latitude,
    location?.coords.longitude,
  );

  if (isFetching) {
    return new Array(10)
      .fill("")
      .map((i, idx) => <SearchResultsSkeleton key={idx} />);
  }

  if (isError) {
    return <ErrorMessage text="Error while loading, try again." />;
  }

  return (
    <ThemeableView className="h-full w-full">
      <Stack.Screen options={{ title: "Search" }} />
      <FlashList
        data={restaurants}
        renderItem={({ item }) => (
          <Link href={`/details/${item.googleId}`} key={item.googleId}>
            <View className="w-full flex-col p-4">
              <ThemeableText className="text-lg font-bold dark:text-white">
                {item.name}
              </ThemeableText>
              <ThemeableText className="text-md dark:text-white">
                {item.address}
              </ThemeableText>
            </View>
          </Link>
        )}
        estimatedItemSize={280}
      />
    </ThemeableView>
  );
}
