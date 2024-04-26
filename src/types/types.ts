export type Post = {
  id: number
  title: string
  sub_title: string
  content: string
  created_at: string
  updated_at: string
  category?: string
  type?: string
  shouldFocus?: boolean
}
