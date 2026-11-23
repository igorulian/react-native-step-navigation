import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Step2() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/step3">Next</Link>
    </View>
  )
}
