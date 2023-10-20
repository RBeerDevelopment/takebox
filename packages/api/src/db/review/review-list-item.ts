export type ReviewListItem = {
  id: string;
  rating: number;
  date: Date;
  content: string;
  restaurant: {
    id: string;
    name: string;
  };
  user: {
    username: string | null;
  };
};
