import { useNavigation } from '@react-navigation/native'
import React, { FC, createContext, useContext, useEffect, useState } from 'react'

interface Props {
  children?: JSX.Element | JSX.Element[]
}

type IRouteType = 'tab' | 'stack'

interface StepNavigationContextProps {
  history: string[]
  previousRoute: string
  rootRoute: string
  goBack: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const StepNavigationContext = createContext<StepNavigationContextProps>({} as StepNavigationContextProps)

export const useStepNavigation = () => useContext(StepNavigationContext)

export const StepNavigationProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const previousRoute = history.length >= 2 ? history[history.length - 2] : history[history.length - 1]
  const navigation = useNavigation()
  const rootRoute = history[0]

  useEffect(() => {
    console.log('==============')
    console.log('history', history)
    console.log('rootRoute', rootRoute)
    console.log('previousRoute', previousRoute)
    console.log('==============')
  }, [history, previousRoute])

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      if (!e) {
        console.log('[navigation.addListener(state)] - no e')
        return false
      }

      const { state } = e.data

      if (!state) {
        console.log('[navigation.addListener(state)] - no state')
        return false
      }

      const route = state.routes[state.routes.length - 1]

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
    })
    return unsubscribe
  }, [history])

  function addRoute(routeName: string) {
    console.log('Verificando se', routeName)
    console.log('Está em:', history)

    if (history.includes(routeName)) {
      console.log('Está em history', routeName)
      const routeIndex = history.indexOf(routeName)
      setHistory(old => {
        const a = []
        for (let x = 0; x <= routeIndex; x++) {
          a.push(old[x])
        }
        return a
      })
    } else {
      console.log('Não está, Aded new route', routeName)
      setHistory(old => ([...old, routeName]))
    }
  }

  function goBack() {
  }

  return (
    <StepNavigationContext.Provider value={{ history, previousRoute, rootRoute, goBack }}>
      {children}
    </StepNavigationContext.Provider>
  )
}
