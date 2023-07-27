import {createContext, ReactNode, useCallback, useContext, useState} from 'react'

interface IDrawerContextData {
  isDrawerOpen: boolean
  toggleDrawerOpen: () => void
  drawerOptions: IDrawerOptionSub[]
  setDrawerOptions: (newDrawerOptions: IDrawerOptionSub[]) => void
}

const DrawerContext = createContext({} as IDrawerContextData)
export const useDrawerContext = () => {
  return useContext(DrawerContext)
}

interface IAppThemeProviderProps {
  children: ReactNode
}

export interface IDrawerOption {
  icon: string
  path: string
  label: string
}

export interface IDrawerOptionSub extends IDrawerOption {
  sublink: IDrawerOption[]
}

export const DrawerProvider: React.FC<IAppThemeProviderProps> = ({children}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptionSub[]>([])

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen)
  }, [])

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptionSub[]) => {
    setDrawerOptions(newDrawerOptions)
  }, [])

  return (
    <DrawerContext.Provider
      value={{
        isDrawerOpen,
        drawerOptions,
        toggleDrawerOpen,
        setDrawerOptions: handleSetDrawerOptions,
      }}
    >
      {children}
    </DrawerContext.Provider>
  )
}
