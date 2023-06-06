import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createStepNavigation } from '../../react-native-step-navigation'
import StepScreen from '../pages/steps/StepScreen'
import StepScreen2 from '../pages/steps/StepScreen2'
import { type StepStackParamList } from '../types/step.routes'

const Stack = createStackNavigator<StepStackParamList>()
const Step = createStepNavigation(Stack)

const StepRoutes = () => {
  return (
    <Step.Navigator>
        <Step.Screen name='Step1' component={StepScreen}/>
        <Step.Screen name='Step2' component={StepScreen2}/>
    </Step.Navigator>
  )
}

export default StepRoutes
