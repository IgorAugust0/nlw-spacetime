declare module '*.png'

// svg transformer declaration for typescript,
// which transforms the svg into a component, because SVGs
// are not supportted in React Native out of the box
declare module '*.svg' {
  import React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
