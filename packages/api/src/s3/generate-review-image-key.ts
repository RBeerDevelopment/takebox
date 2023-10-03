export function generateReviewImageKey(restaurantId: string, userId: string) {
  return `${restaurantId}-${userId}-${Date.now()}`;
}
