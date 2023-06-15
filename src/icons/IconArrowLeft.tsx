import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

const IconArrowLeft = (props: SvgProps) => (
  <Svg
    width={11}
    height={18}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={props.color ?? '#000'}
        fillOpacity={0.85}
        d="M.775 8.623a.878.878 0 0 0 .273.645l7.744 7.568a.865.865 0 0 0 .635.264.881.881 0 0 0 .777-.435.854.854 0 0 0 .122-.454.887.887 0 0 0-.264-.635l-7.11-6.953 7.11-6.953a.887.887 0 0 0 .264-.635c0-.17-.041-.32-.122-.454a.882.882 0 0 0-.776-.435.882.882 0 0 0-.636.254L1.048 7.978a.878.878 0 0 0-.273.645Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.775.146h9.55V17.11H.776z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default IconArrowLeft
