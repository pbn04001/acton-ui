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
    // @ts-ignore
    return settings.reduce((acc, cur, index) => {
        if (acc && index > 0 && !settingsAnd) return true
        if (!acc && settingsAnd) return false
        if (cur.includes('!')) {
            return !(accountSettings as any)[cur.replace('!', '')]
        }
        return !!(accountSettings as any)[cur]
    }, true)
}

export function getNavigation(
    navigation:NavigationInterface[],
    isRoot: boolean,
    curUrl: string,
    setCurrentUrl:(val:string) => void,
    t:Function,
    accountSettings: AccountSettings
) {
    return navigation.map(navItem => {
        if (!hasNavAccess(navItem.settingsAnd, accountSettings, navItem.settings)) return null
        if (isRoot && navItem.items) {
            return (
                <li
                    className={`${rootClass}__item`}
                    key={navItem.label}
                >
                    {navItem.icon && (
                        <Svg name={navItem.icon} />
                    )}
                    <label>{t(navItem.label)}</label>
                    <ul className={`${rootClass}__group`}>
                        {getNavigation(navItem.items, false, curUrl, setCurrentUrl, t, accountSettings)}
                    </ul>
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
                    className={`${rootClass}__link ` + (curUrl === `url` ? `${rootClass}__link--active` : '')}
                    onClick={() => {
                        setCurrentUrl(url)
                    }}
                >
                    <label>{t(navItem.label)}</label>
                    {navItem.items && (
                        <ul className={`${rootClass}__group`}>
                            {getNavigation(navItem.items, false, curUrl, setCurrentUrl, t, accountSettings)}
                        </ul>)}
                </Link>
            </li>
        )
    })
}

const Index: React.FC<NavigationProps> = ({ accountSettings}) => {
  const [curUrl, setCurrentUrl] = useState('/')
  const { t } = useTranslation()

  useEffect(() => {
    const messageReceived = (message: any) => {
      if (message.data?.actonCurrentPage) {
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + message.data.actonCurrentPage)
        document.title = `Act-On :: ${message.data.title}`
        setCurrentUrl(rootContext + message.data.actonCurrentPage)
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

  return (
    <ul className={rootClass}>
        { getNavigation(standardNav, true, curUrl, setCurrentUrl, t, accountSettings)}
    </ul>
  )
}

export default Index
