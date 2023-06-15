# React Native Step Navigation

[![npm version](https://img.shields.io/npm/v/react-native-step-navigation.svg)](https://www.npmjs.com/package/react-native-step-navigation)
[![License](https://img.shields.io/npm/l/react-native-step-navigation.svg)](https://github.com/igorulian/react-native-step-navigation/blob/main/LICENSE)
[![Runs with Expo](https://img.shields.io/badge/Runs%20with%20Expo-4630EB.svg?logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

📚 React Native Step Navigation is a package that allows you to handle step-by-step navigation in React Native applications. It is designed to work seamlessly with Expo and Bare ReactNative, making it easy to integrate into your projects. 🚀

![Example GIF](path/to/example-gif.gif)


For a complete example and more advanced usage, please refer to the [example folder](https://github.com/igorulian/react-native-step-navigation/tree/main/example) in this repository. 📂

## Screenshots

![Example Image 1](path/to/example-image1.png)
![Example Image 2](path/to/example-image2.png)

## Installation

You can install this package using npm or yarn. Make sure you have Expo installed in your project. 📦

```bash
npm install react-native-step-navigation
```

or

```bash
yarn add react-native-step-navigation
```

## Usage

To get started, import the `StepNavigationProvider` component from the package and use it to wrap your application.  ⚙️

Important: the StepNavigationProvider must be wrapping your NavigationContainer

```javascript
import { StepNavigationProvider } from './react-native-step-navigation'
import AppRoutes from './src/routes/app.routes'

export default function App() {
  return (
      <StepNavigationProvider>
        <AppRoutes/>
      </StepNavigationProvider>
  )
}
```

Now, where your NavigationContainer is, add the onStateChange function, which is exported by the useStepNavigation() hook

```javascript
...
import { useStepNavigation } from '../../react-native-step-navigation'

const AppRoutes = () => {
  const { onStateChange } = useStepNavigation()

  return (
    <NavigationContainer onStateChange={onStateChange}>
        [ ... your routes ... ]
    </NavigationContainer>
  )
}

export default AppRoutes
```

Now to use the Step Navigation, is very similar to the Stack navgation usage, you just have to create your step navigation object, lets name it
"Step", wrap your screens with Step.Navigator, and then create your screens with Step.Screen.

```javascript
...
import { createStepNavigation } from 'react-native-step-navigation'

const Step = createStepNavigation()

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
```

##Props

### `StepNavigator` Props

| Prop              | Type                  | Description                                                      | Required |
| ----------------- | --------------------- | ---------------------------------------------------------------- | -------- |
| `closeRoute`      | `string`              | Route to navigate when the close button is pressed.              | No       |
| `title`           | `string`              | Title to display in the header.                                  | No       |
| `header`          | `boolean`             | Flag to show/hide the header.                                    | No       |
| `progressBarStyle`| `IProgressBarStyle`   | Style object for customizing the progress bar appearance.         | No       |
| `headerStyle`     | `ViewStyle`           | Style object for customizing the header container.                | No       |
| `titleStyle`      | `TextStyle`           | Style object for customizing the title text.                      | No       |
| `iconCloseColor`  | `string`              | Color of the close button icon.                                  | No       |
| `iconBackColor`   | `string`              | Color of the back button icon.                                   | No       |

### `Step.Screen` Props

| Prop              | Type                  | Description                                                      | Required |
| ----------------- | --------------------- | ---------------------------------------------------------------- | -------- |
| `name`            | `string`              | Name of the screen.                                              | Yes      |
| `component`       | `any`                 | Component to render for the step.                                | Yes       |
| `header`          | `boolean`             | Flag to show/hide the header for the step.                       | No       |
| `progressBar`     | `boolean`             | Flag to show/hide the progress bar for the step.                  | No       |
| `style`           | `ViewStyle`           | Style object for customizing the step container.                  | No       |
| `backRoute`       | `string`              | Route to navigate when the back button is pressed for the step.   | No       |


## Dependencies

## Contributing

Contributions are welcome! If you have any bug reports, feature requests, or suggestions, please [create an issue](https://github.com/igorulian/react-native-step-navigation/issues) on GitHub.

If you want to contribute code, please follow the [contribution guidelines](https://github.com/igorulian/react-native-step-navigation/blob/main/CONTRIBUTING.md) in this repository.

## License

This project is licensed under the [MIT License](https://github.com/igorulian/react-native-step-navigation/blob/main/LICENSE). 📜
