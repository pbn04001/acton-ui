import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AccountSettings from 'interface/AccountSettings'
import classNames from 'classnames'
import { rootContext } from '../../const/globals'
import standardNav from './conf/standardNav'
import { NavigationInterface, NavigationInterfaceOpenWindow } from './conf/NavigationInterface'
import Svg from '../Svg'

import './navigation.scss'

const rootClass = 'navigation'

interface NavigationProps {
  accountSettings: AccountSettings
}

interface ActiveMenu {
  menu: string
  force: boolean
}

export function hasNavAccess(settingsAnd = true, accountSettings: AccountSettings, settings?: string[]): boolean {
  if (!settings) return true
  return settings.reduce((acc: boolean, cur: string, index) => {
    if (acc && index > 0 && !settingsAnd) return true
    if (!acc && settingsAnd) return false
    if (cur.includes('!')) {
      return !(accountSettings as any)[cur.replace('!', '')]
    }
    return !!(accountSettings as any)[cur]
  }, true)
}

export function getNavIndex(curIndex: string, index: number): string {
  if (curIndex.length === 0) {
    return `${index}`
  } else {
    return `${curIndex}.${index}`
  }
}

export function showChildren(navIndex: string, activeMenu: ActiveMenu): boolean {
  if (navIndex.length > activeMenu.menu.length) return false
  if (navIndex.length === activeMenu.menu.length) return navIndex === activeMenu.menu
  const navParts = navIndex.split('.')
  const activeParts = activeMenu.menu.split('.')
  return navParts.reduce((acc: boolean, cur: string, index) => {
    if (!acc) return acc
    return cur === activeParts[index]
  }, true)
}

export function childrenHasCurrent(items: NavigationInterface[], curUrl: string): boolean {
  if (curUrl.length <= 1) return false
  for (const item of items) {
    if (curUrl.split(`${rootContext}/`)[1] === item.url) {
      return true
    }
    if (item.items && childrenHasCurrent(item.items, curUrl)) {
      return true
    }
  }
  return false
}

export function updateActiveMenu(navIndex: string, activeMenu: ActiveMenu, setActiveMenu: (val: ActiveMenu) => void) {
  if (navIndex === activeMenu.menu) {
    const newActiveMenu = activeMenu.menu.substr(0, activeMenu.menu.lastIndexOf('.'))
    setActiveMenu({
      menu: newActiveMenu,
      force: true
    })
  } else {
    setActiveMenu({
      menu: navIndex,
      force: true
    })
  }
}

export function openWindow(openWindow?: NavigationInterfaceOpenWindow) {
  const iframe = document.getElementById('root-iframe') as HTMLIFrameElement
  if (iframe != null) {
    iframe.contentWindow?.postMessage(
      {
        actonOpenWindow: openWindow
      },
      '*'
    )
  }
}

export function hideAllListingFolders() {
  const iframe = document.getElementById('root-iframe') as HTMLIFrameElement
  if (iframe != null) {
    iframe.contentWindow?.postMessage(
      {
        actonHideAllListingFolders: true
      },
      '*'
    )
  }
}

export function getNavigation(
  curIndex: string,
  navigation: NavigationInterface[],
  curUrl: string,
  setCurrentUrl: (val: string) => void,
  t: Function,
  accountSettings: AccountSettings,
  activeMenu: ActiveMenu,
  setActiveMenu: (val: ActiveMenu) => void
) {
  return navigation.map((navItem, index) => {
    if (!hasNavAccess(navItem.settingsAnd, accountSettings, navItem.settings)) return null
    const navIndex = getNavIndex(curIndex, index)
    const isRoot = navIndex.length === 1
    if (navItem.items) {
      const shouldShowChildren = showChildren(navIndex, activeMenu)
      if (!shouldShowChildren && !activeMenu.force && childrenHasCurrent(navItem.items, curUrl)) {
        setActiveMenu({
          menu: navIndex,
          force: false
        })
      }
      return (
        <li
          className={classNames(`${rootClass}__item`, [
            {
              [`${rootClass}__item--root`]: isRoot
            }
          ])}
          key={navItem.label}
        >
          <button
            className={classNames(`${rootClass}__item-name`, [
              {
                [`${rootClass}__item-name--no-icon`]: !navItem.icon,
                [`${rootClass}__item-name--root`]: isRoot,
                [`${rootClass}__item-name--sub`]: !isRoot,
                [`${rootClass}__item-name--root-active`]: isRoot && shouldShowChildren
              }
            ])}
            onClick={() => {
              updateActiveMenu(navIndex, activeMenu, setActiveMenu)
            }}
          >
            {navItem.icon && <Svg name={shouldShowChildren ? `${navItem.icon}-selected` : navItem.icon} className={`${rootClass}__item-icon`} />}
            {!isRoot && (
              <Svg
                name={`caret-${shouldShowChildren ? 'down' : 'left'}`}
                className={classNames(`${rootClass}__item-caret`, [
                  {
                    [`${rootClass}__item-caret--down`]: shouldShowChildren,
                    [`${rootClass}__item-caret--left`]: !shouldShowChildren
                  }
                ])}
              />
            )}
            <label>{t(navItem.label)}</label>
          </button>
          {shouldShowChildren && (
            <ul className={`${rootClass}__group`}>
              {getNavigation(navIndex, navItem.items, curUrl, setCurrentUrl, t, accountSettings, activeMenu, setActiveMenu)}
            </ul>
          )}
        </li>
      )
    }
    const url = `${rootContext}/${navItem.url}`
    const getLinkInternal = () => (
      <span
        className={classNames(`${rootClass}__item-name`, [
          {
            [`${rootClass}__item-name--no-icon`]: !navItem.icon,
            [`${rootClass}__item-name--active`]: curUrl === url
          }
        ])}
      >
        <label>
          {t(navItem.label)}
          {navItem.beta && <sup>BETA</sup>}
        </label>
      </span>
    )
    return (
      <li className={`${rootClass}__sub-item`} key={navItem.url || `${navItem.openWindow?.url}-${navItem.openWindow?.name}`}>
        {navItem.url && (
          <Link
            to={url}
            className={`${rootClass}__link`}
            onClick={() => {
              setCurrentUrl(url)
            }}
          >
            {getLinkInternal()}
          </Link>
        )}
        {(navItem.openWindow || navItem.hideAllListingFolders) && (
          <button
            className={`${rootClass}__link`}
            onClick={() => {
              if (navItem.openWindow) {
                openWindow(navItem.openWindow)
              } else if (navItem.hideAllListingFolders) {
                hideAllListingFolders()
              }
            }}
          >
            {getLinkInternal()}
          </button>
        )}
      </li>
    )
  })
}

const Index: React.FC<NavigationProps> = (props: NavigationProps) => {
  const { accountSettings } = props
  const [curUrl, setCurrentUrl] = useState('/')
  const [visible, setVisible] = useState(true)
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>({
    menu: '',
    force: false
  })
  const { t } = useTranslation()

  useEffect(() => {
    const messageReceived = (message: any) => {
      if (message.data?.actonCurrentPage) {
        setVisible(true)
        const cleanUrl = unescape(message.data.actonCurrentPage)
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + cleanUrl)
        document.title = `Act-On :: ${message.data.title}`
        setCurrentUrl(rootContext + cleanUrl)
      } else if (message.data?.actonOnLogin) {
        setVisible(false)
      }
    }
    // set resize listener
    window.addEventListener('message', messageReceived)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('message', messageReceived)
    }
  }, [])

  if (!visible) return null
  return (
    <div className={rootClass}>
      <div className={`${rootClass}__logo`}>
        <Svg name="logo" />
      </div>
      <div className={`${rootClass}__body`}>
        <ul className={`${rootClass}__main`}>
          {getNavigation('', standardNav, curUrl, setCurrentUrl, t, accountSettings, activeMenu, setActiveMenu)}
        </ul>
      </div>
    </div>
  )
}

export default Index
