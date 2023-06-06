import React from 'react'
import { type StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { type StepStackParamList } from '../../types/step.routes'

type Props = StackScreenProps<StepStackParamList, 'Step1'>

const StepScreen = ({ navigation }: Props) => {
  function nextStep() {
    navigation.navigate('Step2')
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#faf' }}>
      <Button onPress={nextStep} title='Next Page'/>
    </View>
  )
}

export default StepScreen
