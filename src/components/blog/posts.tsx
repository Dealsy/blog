'use client'

import { format } from 'date-fns'

import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

import { Routes } from '@/contstants'

import HeaderTag from '../ui/header'
import { Card, CardContent } from '../ui/card'
import { Post } from '@/types/types'

export default function Posts({ title, sub_title, id, created_at, updated_at }: Post) {
  const { push } = useRouter()

  const formattedDate = format(created_at, "dd/MM/yyyy 'at' ha")
  const updateFormattedDate = updated_at ? format(updated_at, "dd/MM/yyyy 'at' h:mm a") : null

  const handleRedirect = () => {
    push(`${Routes.POST}/${id}`)
  }

  return (
    <Card
      onClick={handleRedirect}
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleRedirect()
        }
      }}
      className={cn(
        'group flex flex-col items-center gap-5 rounded-lg border p-5',
        'hover:cursor-pointer hover:bg-black hover:text-white',
        'focus:bg-black focus:text-white focus:outline-none focus:ring-2',
        'focus:group focus:ring-black focus:ring-offset-2',
      )}>
      <CardContent className="flex w-full flex-grow flex-col">
        <div className="flex-grow">
          <HeaderTag
            level="h2"
            text={title}
            className="mt-4 text-2xl font-semibold group-hover:text-white"
          />
          <HeaderTag
            level="h3"
            text={sub_title}
            className="my-2 text-base font-medium group-hover:text-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <time className="self-start text-[12px] text-opacity-75">Created: {formattedDate}</time>
          {updated_at && (
            <time
              className={cn(
                'text-[12px] text-black text-opacity-75',
                'group-hover:text-white',
                'group-focus:text-white',
              )}>
              Last Updated: {updateFormattedDate}
            </time>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
