# React Native Step Navigation

[![npm version](https://img.shields.io/npm/v/react-native-step-navigation.svg)](https://www.npmjs.com/package/react-native-step-navigation)
[![License](https://img.shields.io/npm/l/react-native-step-navigation.svg)](https://github.com/igorulian/react-native-step-navigation/blob/main/LICENSE)
[![Runs with Expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/)

📚 A step-by-step header with an animated progress bar, for **React Navigation 7** and **Expo Router**. It's a plain `header` for any Stack, so there's no provider or custom navigator to set up.

![Example GIF](https://raw.githubusercontent.com/igorulian/react-native-step-navigation/main/preview.gif)

## Installation

```bash
npm install react-native-step-navigation
```

Peer dependencies (already in any Expo / React Navigation app): `react-native-safe-area-context`, `react-native-svg`.

## Usage

### Expo Router

Put the steps in a group and give its `_layout` the `StepHeader`:

```tsx
// app/(signup)/_layout.tsx
import { Stack } from 'expo-router'
import { StepHeader } from 'react-native-step-navigation'

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ header: (props) => <StepHeader {...props} /> }}>
      {/* the declaration order is the step order */}
      <Stack.Screen name="name" />
      <Stack.Screen name="address" />
      <Stack.Screen name="password" options={{ title: 'Almost done' }} />
    </Stack>
  )
}
```

In the parent layout, hide its own header for the group: `<Stack.Screen name="(signup)" options={{ headerShown: false }} />`.

Navigate between steps as usual (`router.push('/address')`, `<Link href="/address">`).

### React Navigation 7

```tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack' // or @react-navigation/stack
import { StepHeader } from 'react-native-step-navigation'

const Step = createNativeStackNavigator()

export function SignupSteps() {
  return (
    <Step.Navigator screenOptions={{ header: (props) => <StepHeader {...props} /> }}>
      <Step.Screen name="Name" component={NameScreen} />
      <Step.Screen name="Address" component={AddressScreen} />
      <Step.Screen name="Password" component={PasswordScreen} />
    </Step.Navigator>
  )
}
```

### Per-screen options

- **Title**: `options={{ title: '...' }}`. The default is `Step X of N`.
- **Hide the header**: `options={{ headerShown: false }}`.
- **Hide the progress bar**: `options={{ header: (p) => <StepHeader {...p} progressBar={false} /> }}`.
- **A screen that isn't a step** (for example a summary): leave it out of `steps`. The header shows without a progress bar.

## `StepHeader` props

`navigation`, `route` and `options` come from the stack's `header` callback. Spread `{...props}` to pass them.

| Prop               | Type                                        | Description                                                         |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| `steps`            | `string[]`                                  | Step order. Defaults to the stack's route order.                    |
| `onClose`          | `() => void`                                | Close button action. Defaults to leaving the step stack (`getParent().goBack()`). |
| `progressBar`      | `boolean`                                   | Show the progress bar. Default `true`.                              |
| `progressBarStyle` | `{ height?, color?, backgroundColor? }`     | Progress bar look.                                                  |
| `style`            | `ViewStyle`                                 | Header container style.                                             |
| `titleStyle`       | `TextStyle`                                 | Title style.                                                        |
| `iconBackColor`    | `string`                                    | Back icon color.                                                    |
| `iconCloseColor`   | `string`                                    | Close icon color.                                                   |

On the first step, the back button behaves like close.

`getStep(routeName, steps)` is exported too, if you want to build your own header: it returns `{ index, total, progress }`.

## Migrating from 0.x

1.0 removes `StepNavigationProvider`, `useStepNavigation` and `createStepNavigation`. To migrate:

1. Remove `<StepNavigationProvider>` and `onStateChange` from your `NavigationContainer`.
2. Replace `createStepNavigation()` with `createNativeStackNavigator()` (or `createStackNavigator()`), and pass `screenOptions={{ header: (p) => <StepHeader {...p} /> }}`.
3. Move these props from `Step.Navigator` to `StepHeader`: `progressBarStyle`, `headerStyle` (now `style`), `titleStyle`, `iconBackColor`, `iconCloseColor`.
4. Replace `closeRoute` with `onClose={() => navigation.navigate('Route')}`.
5. Replace `title` with `options.title`.
6. On `Step.Screen`, replace `header={false}` with `options={{ headerShown: false }}`.

## Example

`example/` is an Expo Router app that uses `src/` directly:

```bash
cd example && npm install && npm start
```

## License

[MIT](LICENSE) 📜
