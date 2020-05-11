import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AccountSettings from 'interface/AccountSettings'
import { rootContext } from '../../const/globals'

import './navigation.scss'

interface NavigationProps {
  accountSettings: AccountSettings
}

const Navigation: React.FC<NavigationProps> = () => {
  const [navigation, setNavigation] = useState('/')
  const { t } = useTranslation()

  useEffect(() => {
    const messageReceived = (message: any) => {
      if (message.data?.actonCurrentPage) {
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + message.data.actonCurrentPage)
        document.title = `Act-On :: ${message.data.title}`
        setNavigation(rootContext + message.data.actonCurrentPage)
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
    <div className="navigation">
      <Link
        to={`${rootContext}/`}
        className={'navigation__link ' + (navigation === `${rootContext}/dashboard` ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation(`${rootContext}/`)
        }}
      >
        {t('Start')}
      </Link>
      <Link
        to={`${rootContext}/landingPageLists`}
        className={'navigation__link ' + (navigation === `${rootContext}/landingPageLists` ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation(`${rootContext}/landingPageLists`)
        }}
      >
        {t('Landing Pages')}
      </Link>
    </div>
  )
}

export default Navigation