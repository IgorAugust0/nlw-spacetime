import { useEffect } from 'react'
// import { Link } from "expo-router";
import { useRouter } from 'expo-router'
import { View, Text, TouchableOpacity } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'

import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { api } from '../src/lib/api'

// const discovery for github auth session (expo-auth-session)
const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/bd86bd2138d33386292b',
}

export default function App() {
  const router = useRouter()

  const [, response, signInWithGithub] = useAuthRequest(
    {
      clientId: 'bd86bd2138d33386292b',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime',
      }),
    },
    discovery,
  )

  // function to handle the response from github auth session
  async function handleGithubAuthResponse(code: string) {
    const response = await api.post('/register', {
      code,
    })

    const { token } = response.data // get the token from the response

    await SecureStore.setItemAsync('token', token) // await for the token to be stored in the device

    router.push('/memories') // redirect to the home page
  }

  // function to monitor the change of value of response, in this case, everytime response changes,
  // it will check if the type is success and if it is, it will get the code from the params
  useEffect(() => {
    // console.log(
    //   makeRedirectUri({
    //     scheme: 'nlwspacetime',
    //   }),
    // )
    // console.log(response)
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubAuthResponse(code)
    }
  }, [response])

  /*  
    - ImageBackground: a div with a img tag inside
    - the className styles the whole div and the
    - ImageStyle styles the img tag inside the div
  */
  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()} // anonymous function to call the signInWithGithub function when the button is pressed
        >
          <Text className="font-alt text-sm uppercase text-black">
            cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feito com 💜 por Igor, no NLW da Rocketseat
      </Text>
    </View>
  )
}
