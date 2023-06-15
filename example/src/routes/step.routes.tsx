import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createStepNavigation } from '../../react-native-step-navigation'
import StepScreen from '../pages/steps/StepScreen'
import StepScreen2 from '../pages/steps/StepScreen2'
import { type StepStackParamList } from '../types/step.routes'

const Step = createStepNavigation<StepStackParamList>()

const StepRoutes = () => {
  return (
    <Step.Navigator progressBarStyle={{ color: '#F4B301', height: 6}}>
        <Step.Screen name='Step1' component={StepScreen}/>
        <Step.Screen name='Step2' component={StepScreen2}/>
    </Step.Navigator>
  )
}

export default StepRoutes
