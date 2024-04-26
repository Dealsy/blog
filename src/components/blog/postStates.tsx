import { Post } from '@/types/types'

type PostStatesProps = {
  data: Post[]
}

export default function PostStates({ data }: PostStatesProps) {
  return (
    <>
      {data.length === 0 && (
        <div className="max-w-3xl text-lg font-medium">
          <p>
            <strong>No Posts have been Created.</strong>
          </p>
          <p className="mb-8">Check back later for new posts.</p>
        </div>
      )}
    </>
  )
}
