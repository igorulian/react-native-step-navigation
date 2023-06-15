import React from 'react'
import { type StackScreenProps } from '@react-navigation/stack'
import { Button, View } from 'react-native'
import { type StepStackParamList } from '../../types/step.routes'

type Props = StackScreenProps<StepStackParamList, 'Step3'>

const StepScreen3 = ({ navigation }: Props) => {
  function nextPage() {
    navigation.navigate('Step4')
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#111ff1' }}>
      <Button onPress={nextPage} title='Next Page'/>
    </View>
  )
}

export default StepScreen3
