import React from "react";
import { Stack, useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import { RestaurantSearchItem } from "~/components/restaurant-search-item";
import { ScreenWrapper } from "~/components/screen-wrapper";
import { ErrorMessage } from "../../../components/error-message";
import { SearchResultsSkeleton } from "../../../components/skeleton";
import { useSearch } from "../../../hooks/queries/use-search";
import { useLocationStore } from "../../../state";

export default function SearchScreen() {
  const location = useLocationStore((state) => state.location);

  const { query } = useGlobalSearchParams();

  const { restaurants, isFetching, isError, error } = useSearch(
    query as string | undefined,
    location?.coords.latitude,
    location?.coords.longitude,
  );

  if (isFetching) {
    return (
      <ScreenWrapper>
        <SearchResultsSkeleton />
      </ScreenWrapper>
    );
  }

  if (isError) {
    return (
      <ScreenWrapper>
        <ErrorMessage
          text={`Error while loading, try again. ${error?.message}`}
        />
      </ScreenWrapper>
    );
  }

  if (restaurants?.length === 0) {
    return (
      <ScreenWrapper>
        <ErrorMessage text="No results found. You can try again with another query." />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper className="h-full w-full">
      <Stack.Screen options={{ title: "Search" }} />
      <FlashList
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantSearchItem {...item} key={item.id} />
        )}
        estimatedItemSize={280}
      />
    </ScreenWrapper>
  );
}
