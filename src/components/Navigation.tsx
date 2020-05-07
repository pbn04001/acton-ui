// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './navigation.scss'

interface NavigationProps {
  accountSettings: any
}

const Navigation: React.FC<accountSettings> = (props) => {
  const [navigation, setNavigation] = useState('/')

  useEffect(() => {
    const messageReceived = (message) => {
      if (message.data && message.data.actonCurrentPage) {
        window.history.replaceState('', `Act-On :: ${message.data.title}`, rootContext + message.data.actonCurrentPage);
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

  console.log(navigation)
  return (
    <div className="navigation">
      <Link
        to={`${rootContext}/`}
        className={'navigation__link ' + (navigation === `${rootContext}/` ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation(`${rootContext}/`)
        }}
      >
        Start
      </Link>
      <Link
        to={`${rootContext}/landing-pages`}
        className={'navigation__link ' + (navigation === `${rootContext}/landing-pages` ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation(`${rootContext}/landing-pages`)
        }}
      >
        Landing Pages
      </Link>
    </div>
  )
}

export default Navigation
