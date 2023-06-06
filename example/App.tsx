import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StepNavigationProvider } from 'react-native-step-navigation'
import AppRoutes from './src/routes/app.routes'

export default function App() {
  return (
    <NavigationContainer>
      <StepNavigationProvider>
        <AppRoutes/>
      </StepNavigationProvider>
    </NavigationContainer>
  )
}
