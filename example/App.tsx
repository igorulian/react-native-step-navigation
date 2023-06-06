import React from 'react'
import { StepNavigationProvider } from './react-native-step-navigation'
import AppRoutes from './src/routes/app.routes'

export default function App() {
  return (
      <StepNavigationProvider>
        <AppRoutes/>
      </StepNavigationProvider>
  )
}
