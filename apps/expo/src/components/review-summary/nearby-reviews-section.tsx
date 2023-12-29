import React from "react";

import { useNearbyReviews } from "~/hooks/queries/use-nearby-reviews";
import { ReviewSection } from "./review-section";

export function NearbyReviewSection(): React.ReactElement {
  const nearbyReviews = useNearbyReviews();
  return <ReviewSection {...nearbyReviews} title="Latest Reviews" />;
}
