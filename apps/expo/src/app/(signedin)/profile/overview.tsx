import React from "react";

import { OwnReviewsSection } from "~/components/review-summary/own-reviews-section";
import { ThemeableView } from "~/components/themeable/themable-view";

export default function ProfileScreen() {
  return (
    <ThemeableView className="flex h-full w-full flex-col items-center ">
      <OwnReviewsSection />
    </ThemeableView>
  );
}
