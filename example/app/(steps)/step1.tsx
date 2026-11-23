import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Step1() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Link href="/step2">Next</Link>
    </View>
  )
}
