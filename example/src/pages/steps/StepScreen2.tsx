import React from 'react'
import { type StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { type StepStackParamList } from '../../types/step.routes'

type Props = StackScreenProps<StepStackParamList, 'Step2'>

const StepScreen2 = ({ navigation }: Props) => {
  function goHome() {
    navigation.navigate('Step3')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1ff' }}>
      <Button onPress={goHome} title='Next page'/>
    </View>
  )
}

export default StepScreen2
