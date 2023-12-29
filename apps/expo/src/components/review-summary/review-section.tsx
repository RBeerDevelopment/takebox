import React from "react";
import { RefreshControl, View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { type ReviewListItem } from "@flavoury/api/src/db/review/review-list-item";

import { cn } from "~/utils";
import { SearchResultsSkeleton } from "../skeleton";
import { ThemeableText } from "../themeable/themable-text";
import { ThemeableView } from "../themeable/themable-view";
import { ReviewSummary } from "./review-summary";

type Props = {
  className?: string;
  reviews: ReviewListItem[] | undefined;
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
  refetch: () => void;
  title?: string;
  showUsername?: boolean;
  allowDelete?: boolean;
};

export function ReviewSection(props: Props): React.ReactElement {
  const {
    className,
    reviews,
    isLoading,
    isRefetching,
    isError,
    refetch,
    title,
    allowDelete = false,
    showUsername,
  } = props;

  if (isLoading) return <SearchResultsSkeleton />;

  if (isError || !reviews || reviews.length === 0)
    return (
      <View className="flex h-3/5 w-full items-center pt-10">
        <ThemeableText className="italic">No nearby reviews.</ThemeableText>
      </View>
    );

  return (
    <ThemeableView
      className={cn("flex w-full flex-1 flex-col px-2 pt-4", className)}
    >
      {title ? (
        <ThemeableText className="pb-3 pl-2 font-bold">{title}</ThemeableText>
      ) : null}
      <FlashList
        data={[...reviews, ...reviews]}
        renderItem={({ item }) => (
          <ReviewSummary
            showUsername={showUsername}
            allowDelete={allowDelete}
            review={item}
          />
        )}
        estimatedItemSize={12}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            title=""
            onRefresh={refetch}
            tintColor="#fff"
            titleColor="#fff"
          />
        }
      />
    </ThemeableView>
  );
}
