'use client'

import { Suspense, useState } from 'react'

import Grid from '../ui/grid'
import Posts from './posts'

import PostStates from './postStates'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import HeaderTag from '../ui/header'
import { Post } from '@/types/types'

type AllBlogsProps = {
  data: Post[]
}

type CategoryCounts = {
  [key: string]: number
}

export default function AllBlogs({ data }: AllBlogsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  const handleBadgeClick = (category: string) => {
    if (category === categoryFilter) {
      setCategoryFilter(null)
      return
    }

    setCategoryFilter(category)
  }

  const filteredData = data.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const categoryMatch = categoryFilter ? post.category === categoryFilter : true
    return titleMatch && categoryMatch
  })

  const categoryCounts = data.reduce((acc: CategoryCounts, { category }) => {
    if (typeof category === 'string') {
      acc[category] = (acc[category] || 0) + 1
    }
    return acc
  }, {} as CategoryCounts)

  return (
    <main>
      {data.length > 0 && (
        <div className="flex flex-col">
          <HeaderTag level="h1" text="Posts" className="text-3xl font-semibold" />
          <p className="text-sm">number of posts: {data.length}</p>
        </div>
      )}
      <PostStates data={data} />
      <div className="mb-16 mt-4 flex flex-col gap-5">
        {data && data.length > 0 && (
          <>
            <Input
              type="search"
              placeholder="Search for a post"
              className=" w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />

            <div className="flex flex-row flex-wrap gap-5">
              {Object.entries(categoryCounts).map(([category, count]) => (
                <Badge
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      handleBadgeClick(category)
                    }
                  }}
                  onClick={() => handleBadgeClick(category)}
                  variant={'pill'}
                  key={category}
                  className="cursor-pointer bg-black py-2 text-sm text-white">
                  {`${category} ${count}`}
                </Badge>
              ))}

              <Badge
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleBadgeClick('')
                  }
                }}
                onClick={() => handleBadgeClick('')}
                variant={'pill'}
                className="cursor-pointer bg-black py-2 text-sm text-white">
                Show All
              </Badge>
            </div>
          </>
        )}
      </div>

      <Grid cols={4} className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {filteredData.map(({ title, id, content, created_at, sub_title, updated_at }, index) => (
          <Posts
            shouldFocus={index === 0}
            key={id}
            id={id}
            content={content}
            title={title}
            sub_title={sub_title}
            created_at={created_at}
            updated_at={updated_at}
          />
        ))}
      </Grid>
    </main>
  )
}
