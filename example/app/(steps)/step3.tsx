import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Step3() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/" dismissTo>Finish</Link>
    </View>
  )
}
