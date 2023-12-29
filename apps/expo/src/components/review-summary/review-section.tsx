import React from "react";
import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { type ReviewListItem } from "@flavoury/api/src/db/review/review-list-item";

import { SearchResultsSkeleton } from "../skeleton";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";
import { ReviewSummary } from "./review-summary";

type Props = {
  reviews: ReviewListItem[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  refetch: () => void;
  title?: string;
  showUsername?: boolean;
};

export function ReviewSection(props: Props): React.ReactElement {
  const {
    reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
    title,
    showUsername,
  } = props;

  if (isLoading) return <SearchResultsSkeleton />;

  if (isError || !reviews || reviews.length === 0)
    return (
      <View className="flex h-full w-full items-center pt-10">
        <ThemeableText className="italic">No nearby reviews.</ThemeableText>
      </View>
    );

  return (
    <ThemeableView className="flex h-[78vh] w-full flex-col p-4">
      {title ? (
        <ThemeableText className="pb-2 font-bold">{title}</ThemeableText>
      ) : null}
      <FlashList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewSummary showUsername={showUsername} review={item} />
        )}
        estimatedItemSize={280}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            title="Pull to refresh"
            tintColor="#fff"
            titleColor="#fff"
          />
        }
      />
    </ThemeableView>
  );
}
