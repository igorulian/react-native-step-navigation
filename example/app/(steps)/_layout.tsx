import { Stack } from 'expo-router'
import { StepHeader } from '../../../src'

export default function StepsLayout() {
  return (
    <Stack screenOptions={{ header: (props) => <StepHeader {...props} progressBarStyle={{ color: '#4630EB' }} /> }}>
      <Stack.Screen name="step1" />
      <Stack.Screen name="step2" />
      <Stack.Screen name="step3" options={{ title: 'Almost done' }} />
    </Stack>
  )
}
