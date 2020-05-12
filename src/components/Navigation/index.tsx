import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AccountSettings from 'interface/AccountSettings'
import { rootContext } from '../../const/globals'
import standardNav from './conf/standardNav'
import {NavigationInterface} from './conf/NavigationInterface'
import Svg from '../Svg'

import './navigation.scss'

const rootClass = 'navigation'

interface NavigationProps {
  accountSettings: AccountSettings
}

export function hasNavAccess(settingsAnd: boolean = true, accountSettings: AccountSettings, settings?: string[]):boolean {
    if (!settings) return true
    return settings.reduce((acc: boolean, cur:string, index) => {
        if (acc && index > 0 && !settingsAnd) return true
        if (!acc && settingsAnd) return false
        if (cur.includes('!')) {
            return !(accountSettings as any)[cur.replace('!', '')]
        }
        return !!(accountSettings as any)[cur]
    }, true)
}

export function getNavIndex(curIndex: string, index: number):string {
    if (curIndex.length === 0) {
        return `${index}`
    } else {
        return `${curIndex}.${index}`
    }
}

export function showChildren(navIndex: string, activeMenu: string): boolean {
    if (navIndex.length > activeMenu.length) return false
    if (navIndex.length === activeMenu.length) return navIndex === activeMenu
    const navParts = navIndex.split('\.')
    const activeParts = activeMenu.split('\.')
    return navParts.reduce((acc:boolean, cur:string, index) => {
        if (!acc) return acc
        return cur === activeParts[index]
    }, true)
}

export function childrenHasCurrent(items: NavigationInterface[], curUrl: string): boolean {
    if (curUrl.length <= 1) return false
    for (const item of items) {
        if (item.url === curUrl.split(rootContext)[1]) {
            return true
        }
        if (item.items && childrenHasCurrent(item.items, curUrl)) {
            return true
        }
    }
}

export function getNavigation(
    curIndex: string,
    navigation:NavigationInterface[],
    curUrl: string,
    setCurrentUrl:(val:string) => void,
    t:Function,
    accountSettings: AccountSettings,
    activeMenu: string,
    setActiveMenu:(val:string) => void,
) {
    return navigation.map((navItem, index) => {
        if (!hasNavAccess(navItem.settingsAnd, accountSettings, navItem.settings)) return null
        const navIndex = getNavIndex(curIndex, index)
        if (navItem.items) {
            const shouldShowChildren = showChildren(navIndex,activeMenu);
            if (!shouldShowChildren) {
                const test = childrenHasCurrent(navItem.items, curUrl);
                debugger
            }
            if (!shouldShowChildren && childrenHasCurrent(navItem.items, curUrl)) {
                setActiveMenu(navIndex)
            }
            return (
                <li
                    className={`${rootClass}__item`}
                    key={navItem.label}
                >
                    <button
                        className={`${rootClass}__item-name ${!navItem.icon ? `${rootClass}__item-name--no-icon` : ''} ${navIndex.length === 1 ? `${rootClass}__item-name--root` : ''}`}
                        onClick={() => { setActiveMenu(navIndex) }}
                    >
                        {navItem.icon && (
                            <Svg name={navItem.icon} />
                        )}
                        <label>{t(navItem.label)}</label>
                    </button>
                    {shouldShowChildren && (
                        <ul className={`${rootClass}__group`}>
                        {getNavigation(navIndex, navItem.items, curUrl, setCurrentUrl, t, accountSettings, activeMenu, setActiveMenu)}
                    </ul>)}
                </li>
            )
        }
        const url = `${rootContext}/${navItem.url}`
        return (
            <li
                className={`${rootClass}__sub-item`}
                key={navItem.url}
            >
                <Link
                    to={url}
                    className={`${rootClass}__link ` + (curUrl === url ? `${rootClass}__link--active` : '')}
                    onClick={() => {
                        setCurrentUrl(url)
                    }}
                >
                    <span className={`${rootClass}__item-name ${!navItem.icon ? `${rootClass}__item-name--no-icon` : ''}`}>
                        <label>{t(navItem.label)}</label>
                    </span>
                </Link>
            </li>
        )
    })
}

const Index: React.FC<NavigationProps> = ({ accountSettings}) => {
  const [curUrl, setCurrentUrl] = useState('/')
  const [visible, setVisible] = useState(true)
  const [activeMenu, setActiveMenu] = useState('0')
  const { t } = useTranslation()

  useEffect(() => {
    const messageReceived = (message: any) => {
      if (message.data?.actonCurrentPage) {
        setVisible(true)
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + message.data.actonCurrentPage)
        document.title = `Act-On :: ${message.data.title}`
        setCurrentUrl(rootContext + message.data.actonCurrentPage)
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

  if (!visible) return null;
  return (
      <div className={rootClass}>
        <div className={`${rootClass}__logo`}>
            <Svg name="logo" />
        </div>
        <ul className={`${rootClass}__main`}>
            { getNavigation('',standardNav, curUrl, setCurrentUrl, t, accountSettings, activeMenu, setActiveMenu)}
        </ul>
      </div>
  )
}

export default Index
