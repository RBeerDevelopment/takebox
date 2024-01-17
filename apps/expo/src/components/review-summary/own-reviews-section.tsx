import React from "react";

import { useOwnReviews } from "~/hooks/queries/use-own-reviews";
import { ProfileHeader } from "../profile/header";
import { ReviewSection } from "./review-section";

type Props = {
  className?: string;
};

export function OwnReviewsSection(props: Props): React.ReactElement {
  const ownReviews = useOwnReviews();
  return (
    <ReviewSection
      {...ownReviews}
      header={<ProfileHeader />}
      allowDelete={true}
      showUsername={false}
      className={props.className}
    />
  );
}
