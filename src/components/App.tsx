import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import IFrameViews, { getInternalAddressFromCurrent } from '../views/IFrameViews'
import IFrame from './IFrame'

import './app.scss'

export default function App() {
  const [accountSettings, setAccountSettings] = useState(null)

  useEffect(() => {
    fetch('/acton/ng-ui/jsp/accountSettings.jsp')
      .then((res) => res.json())
      .then(
        (result) => {
          setAccountSettings(result)
        },
        () => {
          if (window.location.host === 'localhost') {
            window.location.href = '//localhost/acton/account/login.jsp'
          } else {
            window.location.href = '/acton/account/login.jsp'
          }
        }
      )
  }, [])

  if (accountSettings === null) return null

  return (
    <>
      <Router>
        <Navigation accountSettings={accountSettings} />
        <Switch>
          <Route path="*">
            <IFrameViews accountSettings={accountSettings} />
          </Route>
        </Switch>
      </Router>
      <IFrame id="root-iframe" src={`/acton/ng-ui/${getInternalAddressFromCurrent(accountSettings, window.location.pathname)}?actonUIFrame=true`} />
    </>
  )
}
