export interface PostInterface {
  id: string;
  title: string;
}

export interface PostStateInterface {
  isLoading: boolean
  posts: PostInterface[]
  error: string | null
}
