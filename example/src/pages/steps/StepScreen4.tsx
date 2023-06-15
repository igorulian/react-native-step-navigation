import React from 'react'
import { type StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { type StepStackParamList } from '../../types/step.routes'

type Props = StackScreenProps<StepStackParamList, 'Step4'>

const StepScreen4 = ({ navigation }: Props) => {
  function goHome() {
    navigation.getParent()?.navigate('Home')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1f1' }}>
      <Button onPress={goHome} title='go Home'/>
    </View>
  )
}

export default StepScreen4
