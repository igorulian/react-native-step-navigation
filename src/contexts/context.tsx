import { NavigationState } from '@react-navigation/native'
import React, { FC, createContext, useContext, useEffect, useState } from 'react'

interface Props {
  children?: JSX.Element | JSX.Element[]
}

type IRouteType = 'tab' | 'stack'

interface StepNavigationContextProps {
  history: string[]
  addRoute: (value: string) => void
  previousRoute: string
  rootRoute: string
  onStateChange: (e: NavigationState | undefined) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const StepNavigationContext = createContext<StepNavigationContextProps>({} as StepNavigationContextProps)

export const useStepNavigation = () => useContext(StepNavigationContext)

export const StepNavigationProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const [rootRoute, setRootRoute] = useState<string>('')
  const previousRoute = history.length >= 2 ? history[history.length - 2] : history[history.length - 1]

  useEffect(() => {
    console.log(history)
  }, [history])

  function addRoute(routeName: string) {
    console.log('Received route', rootRoute)
    if (rootRoute.length <= 0) {
      console.log('Set root route', rootRoute)
      setRootRoute(routeName)
    }
    if (history.includes(routeName)) {
      console.log('here', rootRoute)
      const routeIndex = history.indexOf(routeName)
      setHistory(old => {
        const a = []
        for (let x = 0; x <= routeIndex; x++) {
          a.push(old[x])
        }
        return a
      })
    } else {
      console.log('Aded new route', rootRoute)
      setHistory(old => ([...old, routeName]))
    }
  }

  function onStateChange(e: NavigationState | undefined) {
    if (!e) {
      console.log('[onStateChange] - no e')
      return false
    }

    const route = e.routes[e.routes.length - 1]
    const state = route.state

    if (!state) {
      addRoute(route.name)
      return false
    }

    const routeType: IRouteType = state.type as IRouteType

    let prevRouteName = rootRoute

    if (routeType === 'stack') {
      const rt = state.routes[state.routes.length - 1]
      if (rt.state) {
        const { index, routeNames } = rt.state

        if (!routeNames) {
          console.log('SEM RouteNames')
          return false
        }

        const name = routeNames[index ?? 0]
        prevRouteName = name
      } else {
        console.log('SEM RT.STATE, name=', rt.name)
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
    return true
  }

  return (
    <StepNavigationContext.Provider value={{ addRoute, history, previousRoute, rootRoute, onStateChange }}>
      {children}
    </StepNavigationContext.Provider>
  )
}
