import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home'
import StepRoutes from './step.routes'
import { type RootStackParamList } from '../types/routes'
import { NavigationContainer } from '@react-navigation/native'
import { useStepNavigation } from '../../react-native-step-navigation'

type IRouteType = 'tab' | 'stack'

const Stack = createStackNavigator<RootStackParamList>()

const AppRoutes = () => {
  const { onStateChange } = useStepNavigation()

  return (
    <NavigationContainer onStateChange={onStateChange}>
      <Stack.Navigator >
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen options={{headerShown: false}} name="Step" component={StepRoutes}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes
