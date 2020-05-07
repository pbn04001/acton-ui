// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './navigation.scss'

const Navigation: React.FC = () => {
  const [navigation, setNavigation] = useState('/')

  useEffect(() => {
    const messageReceived = (message) => {
      if (message.data && message.data.actonCurrentPage) {
        setNavigation(message.data.actonCurrentPage)
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
        to="/"
        className={'navigation__link ' + (navigation === '/' ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation('/')
        }}
      >
        Dashboard
      </Link>
      <Link
        to="/landing-pages"
        className={'navigation__link ' + (navigation === '/landing-pages' ? 'navigation__link--active' : '')}
        onClick={() => {
          setNavigation('/landing-pages')
        }}
      >
        Landing Pages
      </Link>
    </div>
  )
}

export default Navigation
