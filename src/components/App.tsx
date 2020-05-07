import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import IFrameViews from '../views/IFrameViews'

import './app.scss'

export default function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/">
          <IFrameViews />
        </Route>
      </Switch>
    </Router>
  )
}
