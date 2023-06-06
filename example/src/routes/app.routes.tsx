import { createStackNavigator } from '@react-navigation/stack'
import Home from '../pages/Home'
import StepRoutes from './step.routes'
import { type RootStackParamList } from '../types/routes'

const Stack = createStackNavigator<RootStackParamList>()

const AppRoutes = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Step" component={StepRoutes}/>
    </Stack.Navigator>
  )
}

export default AppRoutes
