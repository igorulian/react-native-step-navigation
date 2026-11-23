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

- **Title**: `options={{ title: '...' }}`. The default is `Step X of N` (change it with `formatTitle`).
- **Hide the header**: `options={{ headerShown: false }}`.
- **Anything else** (hide back, no progress bar, a custom back target): override `header` on that screen, e.g. `options={{ header: (p) => <StepHeader {...p} showBack={false} /> }}`.
- **A screen that isn't a step** (for example a summary): leave it out of `steps`. The header shows without a progress bar.

### Your app's own header

Wrap `StepHeader` once with your app's defaults (language, icons, colors, analytics) and use the wrapper in every flow:

```tsx
import { StepHeader, StepHeaderProps } from 'react-native-step-navigation'

export function FlowHeader(props: StepHeaderProps) {
  return (
    <StepHeader
      formatTitle={(step, total) => `Etapa ${step} de ${total}`}
      backIcon={<IconArrow />}
      closeIcon={<IconClose />}
      progressBarStyle={{ color: colors.primary }}
      {...props}
    />
  )
}

// a flow with a help button and no close button
<Stack.Navigator screenOptions={{ header: (p) => <FlowHeader {...p} right={<HelpButton />} showClose={false} /> }}>

// a screen that goes back to a specific step (React Navigation 7: `popTo`, not `navigate`)
<Stack.Screen
  name="Times"
  component={TimesScreen}
  options={{ header: (p) => <FlowHeader {...p} onBack={() => p.navigation.popTo('HowOften')} /> }}
/>
```

## `StepHeader` props

`navigation`, `route` and `options` come from the stack's `header` callback. Spread `{...props}` to pass them.

| Prop               | Type                                        | Description                                                         |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------- |
| `steps`            | `string[]`                                  | Step order. Defaults to the stack's route order.                    |
| `formatTitle`      | `(step, total) => string`                   | Default title when the screen has no `options.title`. `step` starts at 1. |
| `onBack`           | `() => void`                                | Back button action. Defaults to `goBack()`; on the first step, same as close. |
| `onClose`          | `() => void`                                | Close button action. Defaults to leaving the step stack (`getParent().goBack()`). |
| `showBack`         | `boolean`                                   | Show the back button. Default `true`.                               |
| `showClose`        | `boolean`                                   | Show the close button. Default `true`.                              |
| `right`            | `ReactNode`                                 | Extra content before the close button (e.g. a help button).         |
| `backIcon`         | `ReactNode`                                 | Replaces the back icon.                                             |
| `closeIcon`        | `ReactNode`                                 | Replaces the close icon.                                            |
| `progressBar`      | `boolean`                                   | Show the progress bar. Default `true`.                              |
| `progressBarStyle` | `{ height?, color?, backgroundColor? }`     | Progress bar look.                                                  |
| `style`            | `ViewStyle`                                 | Header container style.                                             |
| `titleStyle`       | `TextStyle`                                 | Title style.                                                        |
| `iconBackColor`    | `string`                                    | Default back icon color.                                            |
| `iconCloseColor`   | `string`                                    | Default close icon color.                                           |

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
