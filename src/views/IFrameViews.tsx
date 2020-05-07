// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'

import { useHistory } from 'react-router-dom'
import IFrame from '../components/IFrame'

const getInternalAddressFromCurrent = (currentLocation) => {
  switch (currentLocation) {
    case '/landing-pages':
      return {
        url: '/acton/ng-ui/landingPageLists',
        click: 'navLandingPageListsLink'
      }
    case '/':``
      return {
        url: '/acton/ng-ui/dashboard',
        click: 'navDashboardLink'
      }
    default:
      return {
        url: '/acton/ng-ui/dashboard',
        click: 'navDashboardLink'
      }
  }
}

const IFrameViews: React.FC = () => {
  const history = useHistory()
  const [location, setLocation] = useState(getInternalAddressFromCurrent(window.location.pathname))

  const initialLocation = `${location.url}`

  useEffect(() => {
    const iframe:HTMLIFrameElement | null = document.getElementById('root-iframe');
    if (iframe != null) {
      iframe.contentWindow.postMessage({ actonNavigateClick: location.click }, '*')
    }
  }, [location])

  useEffect(() => {
    return history.listen((location) => {
      setLocation(getInternalAddressFromCurrent(location.pathname))
    })
  }, [history])

  return <IFrame id="root-iframe" src={initialLocation} />
}

export default IFrameViews
