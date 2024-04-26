'use server'

import { sql } from '@vercel/postgres'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

import { revalidatePath } from 'next/cache'
import { Post } from '@/types/types'

const sanitizeOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title'],
    span: ['class', 'style'],
  },
}

export async function getPost(id: number) {
  revalidatePath(`/api/posts/${[id]}`)
  try {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id};`

    if (rows.length === 0) {
      return { error: 'Post not found' }
    }

    const processedPosts = rows.map(
      (post): Post => ({
        id: post.id,
        title: post.title,
        sub_title: post.sub_title,
        content: sanitizeHtml(marked(post.content) as string, sanitizeOptions),
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category,
        type: post.type,
      }),
    )

    return { posts: processedPosts }
  } catch (error) {
    console.error(error)
    return { error: 'Error retrieving the post' }
  }
}

export async function getPosts(): Promise<{ posts?: Post[]; error?: string }> {
  revalidatePath('/api/posts')
  try {
    const { rows } =
      await sql`SELECT id, title, sub_title, content, created_at, category, type, updated_at FROM posts WHERE type = ${'public'} ORDER BY created_at DESC`

    if (rows.length === 0) {
      console.log('No posts found.')
      return { posts: [] }
    }

    const processedPosts: Post[] = rows.map(
      (post): Post => ({
        id: post.id,
        title: post.title,
        sub_title: post.sub_title,
        content: sanitizeHtml(marked(post.content) as string, sanitizeOptions),
        created_at: post.created_at,
        updated_at: post.updated_at,
        category: post.category,
        type: post.type,
      }),
    )

    return { posts: processedPosts }
  } catch (error: any) {
    console.error(error)
    return { error: 'Error retrieving posts: ' + error.message }
  }
}
