import React, { FC, createContext, useContext, useState } from 'react'

interface Props {
  children?: JSX.Element | JSX.Element[]
}

interface StepNavigationContextProps {
  history: string[]
  addRoute: (value: string) => void
  previousRoute: string
  rootRoute: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const StepNavigationContext = createContext<StepNavigationContextProps>({} as StepNavigationContextProps)

export const useStepNavigation = () => useContext(StepNavigationContext)

export const StepNavigationProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const [rootRoute, setRootRoute] = useState<string>('')

  const previousRoute = history.length >= 2 ? history[history.length - 2] : history[history.length - 1]

  function addRoute(routeName: string) {
    if (rootRoute.length <= 0) {
      setRootRoute(routeName)
    }
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

  return (
    <StepNavigationContext.Provider value={{ addRoute, history, previousRoute, rootRoute }}>
      {children}
    </StepNavigationContext.Provider>
  )
}
