import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg' // component created from a svg file
import { SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store' // a secure storage for the token, using alias to import
import { StatusBar } from 'expo-status-bar'
// Font imports
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { useEffect, useState } from 'react'

const StyledStripes = styled(Stripes) // so we can style the svg component with tailwind (nativewind)

export default function Layout() {
  // react watch for changes in the state, if the state changes, it will re-render the component
  const [isUserAuthenticated, setIsUserAuthenticate] = useState<null | boolean>(
    null,
  ) // generic type, it can be null or boolean, starts as null
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      // if there is a token (true), it will be stored in the token variable, if not, it will be converted to false
      setIsUserAuthenticate(!!token) // !!token is the same as Boolean(token)
    })
  }, [])

  // if the fonts haven't loaded yet, show the splash screen (a loading screen from expo-router)
  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      {/* the stripes svg component */}
      <StyledStripes className="absolute left-2" />
      {/* change the style of the status bar to light, so it can be seen */}
      <StatusBar style="light" translucent />
      {/* the stack of pages, the first page is the index page */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade',
        }}
      >
        {/* if the user is authenticated, redirect to the memories page */}
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
      {/* in screenOptions we can pass options for all the screens, the first curly bracket is for a javascript code and the second is for an object */}
    </ImageBackground>
  )
}
