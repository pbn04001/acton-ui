import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AccountSettings from 'interface/AccountSettings'
import classNames from 'classnames'
import { rootContext } from '../../const/globals'
import standardNav from './conf/standardNav'
import { NavigationInterface, NavigationInterfaceOpenWindow } from './conf/NavigationInterface'
import Svg from '../Svg'
import { bindActionCreators, compose } from 'redux'
import actions, { AccountActions } from '../../utils/account/actions'
import { connect } from 'react-redux'

import './navigation.scss'

const rootClass = 'navigation'

interface NavigationProps {
  accountSettings?: AccountSettings
}

interface NavigationState {
  menu: string
  force: boolean
  curUrl: string
  visible: boolean
}

export function getTitle(url:string, standardNav: NavigationInterface[]):string | null {
  const urlPart = url.substr(1, url.length)
  for (const nav of standardNav) {
    if (nav?.url === urlPart) {
      return nav.label
    }
    if (nav.items) {
      const title = getTitle(url, nav.items)
      if (title) {
        return title
      }
    }
  }
  return null;
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

export function showChildren(navIndex: string, state: NavigationState): boolean {
  if (navIndex.length > state.menu.length) return false
  if (navIndex.length === state.menu.length) return navIndex === state.menu
  const navParts = navIndex.split('.')
  const activeParts = state.menu.split('.')
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

export function updateActiveMenu(navIndex: string, state: NavigationState, setState: (val: NavigationState) => void) {
  if (navIndex === state.menu) {
    const newActiveMenu = state.menu.substr(0, state.menu.lastIndexOf('.'))
    setState({
      ...state,
      menu: newActiveMenu,
      force: true
    })
  } else {
    setState({
      ...state,
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

export function checkFocusHidden(navIndex: string, state: NavigationState, setState: (val: NavigationState) => void) {
  if (state.menu.length > navIndex.length || navIndex.length - 2 > state.menu.length) {
    setState({
      ...state,
      menu: navIndex.substr(0, navIndex.lastIndexOf('.')),
      force: true
    })
  } else {
    const navIndexParts = navIndex.split('.')
    const menuParts = state.menu.split('.')
    for (let i = 0; i < menuParts.length; i++) {
      if (menuParts[i] !== navIndexParts[i]) {
        setState({
          ...state,
          menu: navIndex.substr(0, navIndex.lastIndexOf('.')),
          force: true
        })
      }
    }
  }
}

export function getNavigation(
  curIndex: string,
  navigation: NavigationInterface[],
  state: NavigationState,
  setState: (val: NavigationState) => void,
  t: Function,
  accountSettings: AccountSettings
) {
  return navigation.map((navItem, index) => {
    if (!hasNavAccess(navItem.settingsAnd, accountSettings, navItem.settings)) return null
    const navIndex = getNavIndex(curIndex, index)
    const isRoot = navIndex.length === 1
    if (navItem.items) {
      const shouldShowChildren = showChildren(navIndex, state)
      if (!shouldShowChildren && !state.force && childrenHasCurrent(navItem.items, state.curUrl)) {
        setState({
          ...state,
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
              updateActiveMenu(navIndex, state, setState)
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
            <label tabIndex={-1}>{t(navItem.label)}</label>
          </button>
          <ul
            className={classNames(`${rootClass}__group`, [
              {
                [`${rootClass}__group--visible`]: shouldShowChildren
              }
            ])}
          >
            {getNavigation(navIndex, navItem.items, state, setState, t, accountSettings)}
          </ul>
        </li>
      )
    }
    const url = `${rootContext}/${navItem.url}`
    const getLinkInternal = () => (
      <span
        className={classNames(`${rootClass}__item-name`, [
          {
            [`${rootClass}__item-name--no-icon`]: !navItem.icon,
            [`${rootClass}__item-name--active`]: state.curUrl === url
          }
        ])}
        tabIndex={-1}
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
            onFocus={() => checkFocusHidden(navIndex, state, setState)}
            className={`${rootClass}__link`}
            onClick={() => {
              setState({
                ...state,
                curUrl: url
              })
            }}
          >
            {getLinkInternal()}
          </Link>
        )}
        {(navItem.openWindow || navItem.hideAllListingFolders) && (
          <button
            className={`${rootClass}__link`}
            onFocus={() => checkFocusHidden(navIndex, state, setState)}
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

const Navigation: React.FC<NavigationProps & AccountActions> = (props: NavigationProps & AccountActions) => {
  const { accountSettings, loadAccount } = props
  const [state, setState] = useState<NavigationState>({
    menu: '',
    force: false,
    curUrl: '/',
    visible: true
  })
  const { t } = useTranslation()

  useEffect(() => {
    if (accountSettings) {
      setState({
        ...state,
        visible: true
      })
    }
  }, [accountSettings])

  useEffect(() => {
    const messageReceived = (message: any) => {
      if (message.data?.actonCurrentPage) {
        if (!accountSettings) {
          loadAccount()
        }
        const cleanUrl = unescape(message.data.actonCurrentPage)
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + cleanUrl)
        const title = getTitle(cleanUrl, standardNav)
        if (title) {
          document.title = `Act-On :: ${title}`
        }
        setState({
          ...state,
          visible: true,
          curUrl: rootContext + cleanUrl
        })
      } else if (message.data?.actonOnLogin) {
        setState({
          ...state,
          visible: false
        })
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

  if (!state.visible || !accountSettings) return null
  return (
    <div className={rootClass}>
      <div className={`${rootClass}__logo`}>
        <Svg name="logo" />
      </div>
      <div className={`${rootClass}__body`}>
        <ul className={`${rootClass}__main`}>{getNavigation('', standardNav, state, setState, t, accountSettings)}</ul>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch)

// @ts-ignore
export default compose(connect(null, mapDispatchToProps))(Navigation)
