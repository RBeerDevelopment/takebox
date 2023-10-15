export type ReviewListItem = {
    id: string
  rating: number
  date: Date
  content: string
  restaurant: {
    name: string
    googleId: string
  }
  user: {
      username: string | null
  }
}