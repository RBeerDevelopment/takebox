import React from "react";

import { Text, View } from "react-native";
import { useSearchParams, Stack, Link } from "expo-router";
import { useGeneralStore } from "../../../state";
import { ErrorMessage } from "../../../components/error-message";
import { FlashList } from "@shopify/flash-list";
import { useSearch } from "../../../hooks/use-search";
import { SearchResultsSkeleton } from "../../../components/skeleton";

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
    <View className="h-full w-full">
      <Stack.Screen options={{ title: "Search" }} />
      <FlashList
        data={restaurants}
        renderItem={({ item }) => (
          <Link href={`/details/${item.googleId}`} key={item.googleId}>
            <View className="w-full flex-col p-4">
              <Text className="text-lg font-bold">{item.name}</Text>
              <Text className="text-md">{item.address}</Text>
            </View>
          </Link>
        )}
        estimatedItemSize={280}
      />
    </View>
  );
}
