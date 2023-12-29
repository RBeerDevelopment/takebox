import React from "react";

import { useNearbyReviews } from "~/hooks/queries/use-nearby-reviews";
import { ReviewSection } from "./review-section";

type Props = {
  className?: string;
};

export function NearbyReviewSection(props: Props): React.ReactElement {
  const nearbyReviews = useNearbyReviews();
  return (
    <ReviewSection
      className={props.className}
      {...nearbyReviews}
      title="Latest Reviews"
    />
  );
}
