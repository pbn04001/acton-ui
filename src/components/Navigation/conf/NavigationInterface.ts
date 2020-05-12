export interface NavigationInterfaceOpenWindow {
  url: string
  name: string
  width?: number
  popup?: boolean
}

export interface NavigationInterface {
  icon?: string // icon for the navigation item, only for root level items
  label: string // string to be displayed for the navigation item
  settings?: string[] // string values of Account settings properties to check for access
  settingsAnd?: boolean // Should settings be && together
  url?: string // url to direct link to
  openWindow?: NavigationInterfaceOpenWindow // on click command that will be passed down to acton class to be executed
  items?: NavigationInterface[] // all sub items for this navigation
}
