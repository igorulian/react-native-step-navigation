import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const IconX = (props: SvgProps) => (
  <Svg
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={props.color ?? '#000'}
        fillOpacity={0.85}
        d="M.571 13.695c.11.111.241.186.39.225a.894.894 0 0 0 .85-.225l5-5.01 5.01 5.01a.875.875 0 0 0 1.23 0 .778.778 0 0 0 .23-.395.973.973 0 0 0 0-.454.778.778 0 0 0-.23-.391l-5-5.01 5-5a.777.777 0 0 0 .23-.39.973.973 0 0 0 0-.454.778.778 0 0 0-.23-.396.876.876 0 0 0-1.23 0l-5.01 5.01-5-5.01A.894.894 0 0 0 .961.98a.845.845 0 0 0-.39.225.778.778 0 0 0-.23.396.932.932 0 0 0 .006.454c.039.15.114.28.224.39l5.01 5-5.01 5.01a.846.846 0 0 0-.224.39.932.932 0 0 0-.005.455.778.778 0 0 0 .23.395Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.316.932h12.992V13.95H.316z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconX
