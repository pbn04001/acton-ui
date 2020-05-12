import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { rootContext } from '../const/globals'
import AccountSettings from '../interface/AccountSettings'

export const getInternalAddressFromCurrent = (accountSettings: AccountSettings, currentLocation: string) => {
  if (new RegExp(`^${rootContext}\/?$`).test(currentLocation)) {
    return accountSettings.isMicrosoftStartPage ? 'microsoftStart' : 'dashboard'
  }
  return currentLocation.split(`${rootContext}/`)[1] + window.location.search
}

interface FrameViewProps {
  accountSettings: AccountSettings
}

const IFrameViews: React.FC<FrameViewProps> = (props) => {
  const history = useHistory()

  useEffect(() => {
    return history.listen((location) => {
      const iframe = document.getElementById('root-iframe') as HTMLIFrameElement
      if (iframe != null) {
        iframe.contentWindow?.postMessage(
          {
            actonNavigate: getInternalAddressFromCurrent(props.accountSettings, location.pathname)
          },
          '*'
        )
      }
    })
  }, [history])

  return null
}

export default IFrameViews
