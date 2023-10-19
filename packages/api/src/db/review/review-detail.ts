import type { ReviewListItem } from "./review-list-item";

export type ReviewDetail = ReviewListItem & {
  user: { id: string };
  imageUrl: string | null;
  tags: string[];
};
