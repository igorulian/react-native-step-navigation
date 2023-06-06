import * as React from 'react'
import Svg, { SvgProps, G, Path } from 'react-native-svg'

const IconX = (props: SvgProps) => (
  <Svg width={24} height={24} {...props}>
    <G data-name="Grupo 33702">
      <Path data-name="Ret\xE2ngulo 4006" fill="none" d="M0 0h24v24H0z" />
      <G data-name="Grupo 33680">
        <G
          data-name="Grupo 33682"
          fill="none"
          stroke={props.color ?? '#7b7b7b'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        >
          <Path data-name="Linha 1254" d="M7 17 17 7" />
          <Path data-name="Linha 1255" d="M17 17 7 7" />
        </G>
      </G>
    </G>
  </Svg>
)

export default IconX
