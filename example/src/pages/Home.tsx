import { Button, View } from 'react-native'
import { RootStackParamList } from '../types/routes'
import { StackScreenProps } from '@react-navigation/stack'

type Props = StackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {
  function onGoToStep() {
    navigation.navigate('Step')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>

      <Button onPress={onGoToStep} title='Example 1'/>

    </View>
  )
}

export default Home
