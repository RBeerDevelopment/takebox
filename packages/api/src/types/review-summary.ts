export interface ReviewSummary {
  id: string;
  content: string;
  rating: number;
  restaurant: {
    name: string;
    googleId: string;
  };
  user: {
    username: string | null;
  };
  date: Date;
  imageUrl: string | null;
}
