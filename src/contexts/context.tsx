import { NavigationState } from '@react-navigation/native'
import React, { FC, createContext, useContext, useState } from 'react'

interface Props {
  children?: JSX.Element | JSX.Element[]
}
export type IRouteType = 'tab' | 'stack'

interface StepNavigationContextProps {
  history: string[]
  previousRoute: string
  rootRoute: string
  addRoute: (value: string) => void
  onStateChange: (value: any) => void
  setRootRoute: (value: string) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const StepNavigationContext = createContext<StepNavigationContextProps>({} as StepNavigationContextProps)

export const useStepNavigation = () => useContext(StepNavigationContext)

export const StepNavigationProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const [rootRoute, setRootRoute] = useState<string>('')

  const previousRoute = history.length >= 2 ? history[history.length - 2] : history[history.length - 1]

  function addRoute(routeName: string) {
    if (history.includes(routeName)) {
      const routeIndex = history.indexOf(routeName)
      setHistory(old => {
        const a = []
        for (let x = 0; x <= routeIndex; x++) {
          a.push(old[x])
        }
        return a
      })
    } else {
      setHistory(old => ([...old, routeName]))
    }
  }

  function onStateChange(e: NavigationState | undefined) {
    if (!e) return

    const route = e.routes[e.routes.length - 1]
    const state = route.state

    if (!state) {
      if (route.name === 'SplashScreen') return
      addRoute(route.name)
      return
    }

    const routeType: IRouteType = state.type as IRouteType

    let prevRouteName = rootRoute

    if (routeType === 'stack') {
      const rt = state.routes[state.routes.length - 1]
      if (rt.state) {
        const { index, routeNames } = rt.state

        if (!routeNames) {
          return
        }

        const name = routeNames[index ?? 0]
        prevRouteName = name
      } else {
        prevRouteName = rt.name
      }
    }

    if (routeType === 'tab') {
      if (state.history) {
        const hst: any = state.history
        prevRouteName = hst[(state.history.length) - 1].key.toString().split('-')[0]
      }
    }

    addRoute(prevRouteName)
  }

  function changeRootRoute(route: string) {
    setRootRoute(route)
    setHistory(old => (
      [route, ...old]
    ))
  }

  return (
    <StepNavigationContext.Provider value={{ addRoute, history, previousRoute, rootRoute, onStateChange, setRootRoute: changeRootRoute }}>
      {children}
    </StepNavigationContext.Provider>
  )
}
