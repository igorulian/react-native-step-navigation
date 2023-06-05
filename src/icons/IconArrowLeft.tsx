import * as React from 'react'
import Svg, { type SvgProps, Path } from 'react-native-svg'

const IconArrowLeft = (props: SvgProps) => (
  <Svg data-name="\xCDcone - 24px" width={16} height={16} {...props}>
    <Path data-name="Ret\xE2ngulo 3946" fill="none" d="M0 0h16v16H0z" />
    <Path
      data-name="Caminho 39405"
      d="M11 14 5 8l6-6"
      fill="none"
      stroke={props.color ?? '#7b7b7b'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </Svg>
)

export default IconArrowLeft
