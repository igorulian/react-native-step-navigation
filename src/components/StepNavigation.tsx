import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { useStepNavigation } from '../contexts/context'
import { useNavigation } from '@react-navigation/native'
import { CardStyleInterpolators } from '@react-navigation/stack'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import StepNavigationHeader from './StepNavigationHeader'

const options = {
  headerShown: false,
  cardStyle: { backgroundColor: '#FFFFFF' },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
}

interface NavigatorProps {
  closeRoute?: string
  children: JSX.Element[]
  title?: string
  header?: boolean
}

interface ScreenProps {
  name: string
  component?: FC<any>
  header?: boolean
  progressBar?: boolean
  style?: StyleProp<ViewStyle>
  backRoute?: string
  children?: (props: any) => Element
}

const EmptyObject = (_: ScreenProps) => <View/>

const Screen = ({ name, component, header = true, progressBar = true, style }: ScreenProps) => {
  return <EmptyObject name={name} component={component} header={header} progressBar={progressBar} style={style}/>
}

const createStepNavigation = (stack: any) => {
  const getPages = (children: JSX.Element[]) => {
    const pages: ScreenProps[] = []

    children.forEach((item: JSX.Element) => {
      const screenProps: ScreenProps = item.props
      pages.push(screenProps)
    })
    return pages
  }

  const Navigator: FC<NavigatorProps> = ({
    children,
    title,
    closeRoute,
    header = true
  }) => {
    const { previousRoute, rootRoute } = useStepNavigation()
    const pages = getPages(children)
    const navigation = useNavigation<any>()
    const progressbar = useState(new Animated.Value((1 / pages.length) * 100))[0]
    const [currentPage, setCurrentPage] = useState(pages[0])
    const [progress, setProgress] = useState(0)

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

        if (!currentRoutes) { console.log('No current routes'); return }

        const currentRoute = currentRoutes[currentRoutes.length - 1]

        const cPage = pages.find(page => page.name === currentRoute.name)

        if (!cPage) {
          console.log('[ERROR]: NO current page found')
          return
        }

        const currentPageIndex = pages.indexOf(cPage)

        if (currentPageIndex === null || currentPageIndex === undefined) {
          console.log('[ERROR]: CurrentPage without index')
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
        <View style={currentPage.style}>
          {(header && currentPage.header) ?? (
            <>
              <StepNavigationHeader
                title={title ?? `Etapa ${progress + 1} de ${pages.length}`}
                onPressBack={() => { navigation.navigate(previousRoute) }}
                onPressClose={() => { navigation.navigate(closeRoute ?? rootRoute) }}
              />
              {currentPage.progressBar ?? (
                <Animated.View style={[style.progressBar, { width: progressBarWidth }]} />
              )}
            </>
          )}
          <stack.Navigator screenOptions={options}>
            {pages.map(item => (
              <stack.Screen key={item.name} name={item.name} component={item.component}>
                {item.children}
              </stack.Screen>
            ))}
          </stack.Navigator>
        </View>
    )
  }

  return {
    Navigator,
    Screen
  }
}

export default createStepNavigation

const style = StyleSheet.create({
  progressBar: {
    backgroundColor: '#333',
    height: 2,
    marginTop: -2
  },
  page: {
    flex: 1
  }
})
