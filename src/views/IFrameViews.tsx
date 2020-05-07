// @ts-nocheck
import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

export const getInternalAddressFromCurrent = (accountSettings, currentLocation) => {
  switch (currentLocation) {
    case '/landing-pages':
      return 'landingPageLists'
    case '/':
      return accountSettings.isMicrosoftStartPage ? 'microsoftStart' : 'dashboard'
    default:
      return '404page'
  }
}

interface IFrameViewProps {
  accountSettings: any
}

const IFrameViews: React.FC<IFrameViewProps> = (props) => {
  const history = useHistory()

  useEffect(() => {
    return history.listen((location) => {
      const iframe: HTMLIFrameElement | null = document.getElementById('root-iframe')
      if (iframe != null) {
        iframe.contentWindow.postMessage({ actonNavigate: getInternalAddressFromCurrent(props.accountSettings, location.pathname) }, '*')
      }
    })
  }, [history])

  return null;
}

export default IFrameViews
