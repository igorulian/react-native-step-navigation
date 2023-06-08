import React from 'react'
import { StepNavigationProvider } from './react-native-step-navigation'
import AppRoutes from './src/routes/app.routes'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <NavigationContainer>
      <StepNavigationProvider>
        <AppRoutes/>
      </StepNavigationProvider>
    </NavigationContainer>
  )
}
