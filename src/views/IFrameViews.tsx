import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { rootContext } from '../const/globals'
import AccountSettings from '../interface/AccountSettings'

export const getInternalAddressFromCurrent = (accountSettings, currentLocation) => {
  switch (currentLocation) {
    case `${rootContext}/`:
      return accountSettings.isMicrosoftStartPage ? 'microsoftStart' : 'dashboard'
    default:
      return currentLocation.split(`${rootContext}/`)[1]
  }
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
        //@ts-ignore
        iframe.contentWindow.postMessage(
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
