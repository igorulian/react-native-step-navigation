import { ParamListBase, useNavigation } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React, { FC, useEffect, useState } from 'react'
import { Animated, Easing, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { IRouteType, useStepNavigation } from '../contexts/context'
import StepNavigationHeader from './StepNavigationHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export interface ProgressFlowProps {
  from: string
}

const options = {
  headerShown: false,
  cardStyle: { backgroundColor: '#FFFFFF' },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

interface IProgressBarStyle {
  height?: number
  color?: string
}

interface INavigator {
  closeRoute?: string
  children: JSX.Element[]
  title?: string
  header?: boolean
  progressBarStyle?: IProgressBarStyle
  headerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

interface IScreen {
  name: string
  component?: any
  header?: boolean
  progressBar?: boolean
  style?: StyleProp<ViewStyle>
  backRoute?: string
  children?: any
}

function createProgressFlow<Param extends ParamListBase>() {
  const Stack = createStackNavigator<Param>()
  const getPages = (children: JSX.Element[]) => {
    const pages: IScreen[] = []

    children.forEach((item: JSX.Element) => {
      const screenProps: IScreen = item.props
      pages.push(screenProps)
    })
    return pages
  }

  const EmptyObject = (_: IScreen) => <View/>

  const Screen = ({ name, component, header = true, progressBar = true, style }: IScreen) => {
    return <EmptyObject name={name} component={component} header={header} progressBar={progressBar} style={style}/>
  }

  const Navigator: FC<INavigator> = ({
    children,
    title,
    closeRoute,
    header = true,
    progressBarStyle,
    titleStyle,
    headerStyle
  }) => {
    const { previousRoute, rootRoute, setRootRoute } = useStepNavigation()
    const pages = getPages(children)
    const navigation = useNavigation<any>()
    const progressbar = useState(new Animated.Value((1 / pages.length) * 100))[0]
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [progress, setProgress] = useState(0)
    const insets = useSafeAreaInsets()

    // useEffect(() => {
    //   console.log('from', from)
    // },[from])

    useEffect(() => {
      const state = navigation.getState()
      const routeType: IRouteType = state.type as IRouteType

      let firstRoute = ''

      if (routeType === 'stack') {
        const rt = state.routes[0]
        if (rt.state) {
          const { index, routeNames } = rt.state

          if (!routeNames) {
            return
          }

          const name = routeNames[index ?? 0]
          firstRoute = name
        } else {
          firstRoute = rt.name
        }
      }

      if (routeType === 'tab') {
        if (state.history) {
          const hst: any = state.history
          firstRoute = hst[0].key.toString().split('-')[0]
        }
      }

      setRootRoute(firstRoute)
    }, [])

    useEffect(() => {
      const toValue = ((progress + 1) / pages.length) * 100

      Animated.timing(progressbar, {
        toValue,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false
      }).start()
    }, [progress])

    useEffect(() => {
      const unsubscribe = navigation.addListener('state', (e: any) => {
        const { routes } = e.data.state
        const currentRoutes = routes[routes.length - 1].state?.routes

        if (!currentRoutes) return

        const currentRoute = currentRoutes[currentRoutes.length - 1]

        const cPage = pages.find(page => page.name === currentRoute.name)

        if (!cPage) {
          return
        }

        const currentPageIndex = pages.indexOf(cPage)

        if (currentPageIndex === null || currentPageIndex === undefined) {
          return
        }

        setCurrentPage(cPage)

        setProgress(currentPageIndex)
      })
      return unsubscribe
    }, [])

    const progressBarWidth = progressbar.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%']
    })

    return (
        <View style={[{ flex: 1, paddingTop: insets.top }, currentPage.style]}>
          {(header && currentPage.header) ?? (
            <>
              <StepNavigationHeader
                title={title ?? `Etapa ${progress + 1} de ${pages.length}`}
                onPressBack={() => { navigation.navigate(previousRoute) }}
                onPressClose={() => { navigation.navigate(closeRoute ?? rootRoute) }}
                style={headerStyle}
                titleStyle={titleStyle}
              />
              {currentPage.progressBar ?? (
                <Animated.View style={[style.progressBar, { width: progressBarWidth }, {
                  backgroundColor: progressBarStyle?.color ?? '#000',
                  height: progressBarStyle?.height ?? 2
                }]} />
              )}
            </>
          )}
          <Stack.Navigator screenOptions={options}>
            {pages.map(item => (
              <Stack.Screen key={item.name} name={item.name} component={item.component}>
                {item.children}
              </Stack.Screen>
            ))}
          </Stack.Navigator>
        </View>
    )
  }

  return {
    Navigator,
    Screen
  }
}

export default createProgressFlow

const style = StyleSheet.create({
  progressBar: {
    height: 2,
    marginTop: -2
  }
})
