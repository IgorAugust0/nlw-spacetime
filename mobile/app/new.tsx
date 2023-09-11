// new memory page
import { View, Text, Switch, TextInput, ScrollView, Image } from 'react-native'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { Link } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets() // get the safe area insets from the device

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

  function handleCreateMemory() {
    console.log(content, isPublic)
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
