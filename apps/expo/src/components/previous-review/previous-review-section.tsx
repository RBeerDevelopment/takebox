import React from "react";
import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

import { api } from "~/utils/api";
import { Skeleton } from "../skeleton/skeleton";
import { PreviousReviewSummary } from "./previous-review-summary";

export function PreviousReviewSection(): React.ReactElement {
    const {
        data: reviews,
        isLoading,
        isError,
    } = api.review.usersOwnReviews.useQuery();

    if (isLoading) return <Skeleton />;

    if (isError || reviews.length === 0) return <></>;
    return (
        <View className="flex h-5/6 w-full flex-col p-4">
            <FlashList
                data={reviews}
                renderItem={({ item }) => (
                    <PreviousReviewSummary review={item} />
                )}
                estimatedItemSize={280}
            />
        </View>
    );
}
