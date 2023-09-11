// Main page of the app, where the user will see the memories

import { EmptyMemories } from '@/components/EmptyMemories'
import Image from 'next/image'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import { cookies } from 'next/dist/client/components/headers'
import { ArrowRight, Link } from 'lucide-react'
//  // change the language of the dayjs library globally:
// import ptbr from 'dayjs/locale/pt-br'
// dayjs.locale(ptbr) // set the locale to pt-br

// same interface as the one defined in the mobile app
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

// if we define a component as async we can make the http requests directly inside it, without
// having to use useEffect, since the component will only be rendered when the request is finished
export default async function Home() {
  const isAuthenticated = cookies().has('token')

  // if the user is not authenticated, show the empty memories component
  if (!isAuthenticated) {
    return <EmptyMemories />
  }

  // get the memories from the api, passing the token in the header
  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data // get the memories from the response and stores them in a variable

  // if there are no memories, show the empty memories component
  if (memories.length === 0) {
    return <EmptyMemories />
  }

  // if there are memories, show them
  return (
    <div className="flex flex-col gap-10 p-8">
      {/* List of memories */}
      {memories.map((memory) => {
        return (
          <div key={memory.id} className="space-y-4">
            {/* Memory date */}
            <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(memory.createdAt)
                .locale('pt-br')
                .format('D[ de ]MMMM[, ]YYYY')}
            </time>
            {/* Memory cover */}
            <Image
              alt=""
              src={memory.coverUrl}
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover" // images above 5mb will be cropped due to the server limitations
            />
            {/* Memory excerpt */}
            <p className="text-lg leading-relaxed text-gray-100">
              {memory.excerpt}
            </p>

            {/* Link to the memory by id */}
            <Link
              href={`/memories/${memory.id}`}
              className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
            >
              Ler mais
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )
      })}
    </div>
  )
}
