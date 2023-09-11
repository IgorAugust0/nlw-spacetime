// new memory page
import { View, ScrollView, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SecureStore from 'expo-secure-store'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import Icon from '@expo/vector-icons/Feather'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'
import dayjs from 'dayjs'
// change the language of the dayjs library globally:
// import ptbr from 'dayjs/locale/pt-br'
// dayjs.locale(ptbr) // set the locale to pt-br

// interface to define the memory object type
interface Memory {
  coverUrl: string
  excerpt: string
  createdAt: string
  id: string
}

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets() // get the safe area insets from the device
  const router = useRouter() // get the router from the expo router
  const [memories, setMemories] = useState<Memory[]>([]) // get the memories from the context

  async function signOut() {
    await SecureStore.deleteItemAsync('token').then(() => {
      router.push('/') // redirect to the index page
    })
  }

  // aux function (because wr can't use the useEffect hook inside an async function)
  // to get the memories from the api checkin if the user is authenticated
  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories() // get the memories when the page loads
  }, [])

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />
        <View className="flex-row gap-5">
          {/* TouchableOpacity is a button that can be pressed and has a opacity effect when pressed */}
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {/* the key prop is used to identify the component, it must be unique */}
        {memories.map((memory) => {
          return (
            <View key={memory.id} className="space-y-4">
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50">
                  <Text className="font-body text-xs text-gray-100">
                    {/* dayjs is a date library used to format the date that comes as a string from the api to a more readable format, in this case, DD/MM/YYYY */}
                    {dayjs(memory.createdAt)
                      .locale('pt-br')
                      .format('D[ de ]MMMM[, ]YYYY')}
                  </Text>
                </View>
              </View>
              <View className="space-y-4 px-8">
                <Image
                  source={{ uri: memory.coverUrl }}
                  alt=""
                  className="aspect-video w-full rounded-lg"
                />
                <Text className="font-body text-base leading-relaxed text-gray-100">
                  {memory.excerpt}
                </Text>
                {/* As child is a prop from the Link component, it makes the component that is inside the Link component a child of the Link component */}
                <Link href="/memories/id" asChild>
                  <TouchableOpacity className="flex-row items-center gap-2">
                    <Text className="font-body text-sm text-gray-200">
                      Ler mais
                    </Text>
                    <Icon name="arrow-left" size={16} color="#9e9ea0" />
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
// * union type is a type that can be one of the types specified, in this case it can be a string or null
