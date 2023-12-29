import React from "react";

import { useOwnReviews } from "~/hooks/queries/use-own-reviews";
import { ReviewSection } from "./review-section";

export function OwnReviewsSection(): React.ReactElement {
  const ownReviews = useOwnReviews();
  return <ReviewSection {...ownReviews} showUsername={false} />;
}
