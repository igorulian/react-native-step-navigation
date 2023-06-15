import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createStepNavigation } from '../../react-native-step-navigation'
import StepScreen from '../pages/steps/StepScreen'
import StepScreen2 from '../pages/steps/StepScreen2'
import { type StepStackParamList } from '../types/step.routes'
import StepScreen3 from '../pages/steps/StepScreen3'
import StepScreen4 from '../pages/steps/StepScreen4'

const Step = createStepNavigation<StepStackParamList>()

const StepRoutes = () => {
  return (
    <Step.Navigator>
        <Step.Screen name='Step1' component={StepScreen}/>
        <Step.Screen name='Step2' component={StepScreen2}/>
        <Step.Screen name='Step3' component={StepScreen3}/>
        <Step.Screen name='Step4' component={StepScreen4}/>
    </Step.Navigator>
  )
}

export default StepRoutes
