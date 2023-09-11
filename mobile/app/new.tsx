// new memory page
import { View, Text, Switch, TextInput, ScrollView, Image } from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { api } from '../src/lib/api'
// import sharp from 'sharp' could be used to convert the image to a jpeg format and reduce the size of the image

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets() // get the safe area insets from the device
  const router = useRouter() // get the router from the expo router

  const [preview, setPreview] = useState<string | null>(null) // state to store the cover image of the memory (*)
  const [content, setContent] = useState('') // state to store the content of the memory stored in the text input
  const [isPublic, setIsPublic] = useState(false) // state to check if the memory is public or not, used in the toggle switch

  // state to store the image uri of the memory cover image
  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        // allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      })

      if (result.assets) {
        setPreview(result.assets[0].uri)
      }
    } catch (err) {
      // throw some error
      // return console.log(err)
      throw new Error(err)
    }
  }

  async function handleCreateMemory() {
    // get the token from the secure store
    const token = await SecureStore.getItemAsync('token')

    let coverUrl = ''

    if (preview) {
      const uploadFormData = new FormData() // because its an upload, it needs to be a multipart form data, not a json

      // this is a problem of the typescript integrated with the react-native, it doesn't recognize the append function
      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any)

      // response from the api call to upload the image to the server
      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data', // this is a upload, so the content type is 'multipart/form-data
          // authorization: `Bearer ${token}`,
        },
      })

      // get the url of the uploaded image
      coverUrl = uploadResponse.data.url
      console.log(coverUrl)
    }

    // call the api to create a new memory with the data from the form
    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )

    // the operatior && is a short circuit operator, it checks if the first value is true, if it is, it returns the second value
    router && router.push('/memories') // redirect the user to the memories page after creating a new memory
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />
        <Link href="/memories" asChild>
          {/* TouchableOpacity is a button that can be pressed and has a opacity effect when pressed */}
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{ false: '#767577', true: '#372560' }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt=""
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" size={24} color="#FFF" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {/* multiline turns the input into a textarea */}
        <TextInput
          multiline
          value={content}
          onChangeText={setContent} // same as {value => setContent(value)}
          textAlignVertical="top"
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateMemory}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
          // onPress={() => signInWithGithub()} // anonymous function to call the signInWithGithub function when the button is pressed
        >
          <Text className="font-alt text-sm uppercase text-black">
            salvar lembrança
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
// 44:45
// * union type is a type that can be one of the types specified, in this case it can be a string or null
