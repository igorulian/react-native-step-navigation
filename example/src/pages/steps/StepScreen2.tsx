import { type StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { type StepStackParamList } from '../../types/step.routes'

type Props = StackScreenProps<StepStackParamList, 'Step2'>

const StepScreen2 = ({ navigation }: Props) => {
  function goHome() {
    navigation.getParent()?.navigate('Home')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#1ff' }}>
      <Button onPress={goHome} title='go Home'/>
    </View>
  )
}

export default StepScreen2
