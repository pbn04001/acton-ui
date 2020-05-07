// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react'

import { useHistory } from 'react-router-dom'
import IFrame from '../components/IFrame'

export const getInternalAddressFromCurrent = (currentLocation) => {
  switch (currentLocation) {
    case '/landing-pages':
      return 'landingPageLists'
    case '/':
      return 'dashboard'
    default:
      return 'dashboard'
  }
}

const IFrameViews: React.FC = () => {
  const history = useHistory()

  useEffect(() => {
    return history.listen((location) => {
      const iframe: HTMLIFrameElement | null = document.getElementById('root-iframe')
      if (iframe != null) {
        iframe.contentWindow.postMessage({ actonNavigate: getInternalAddressFromCurrent(location.pathname) }, '*')
      }
    })
  }, [history])

  return null;
}

export default IFrameViews
