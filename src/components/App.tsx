import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import IFrameViews, {getInternalAddressFromCurrent} from '../views/IFrameViews'

import './app.scss'
import IFrame from "./IFrame"

export default function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/">
            <IFrameViews />
          </Route>
        </Switch>
      </Router>
      <IFrame id="root-iframe" src={`/acton/ng-ui/${getInternalAddressFromCurrent(window.location.pathname)}`} />
    </>
  )
}
