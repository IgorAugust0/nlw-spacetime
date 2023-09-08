import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg' // component created from a svg file
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
// Font imports
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

const StyledStripes = styled(Stripes) // so we can style the svg component with tailwind (nativewind)

export default function Layout() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

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
      {/* the stack of pages, the first page is the home page */}
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
      {/* in screenOptions we can pass options for all the screens, the first curly bracket is for a javascript code and the second is for an object */}
    </ImageBackground>
  )
}
