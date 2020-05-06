import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'
import IFrame from './IFrame'

import './app.scss'

export default function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/landing-pages">
          <IFrame src="//localhost/acton/ng-ui/landingPageLists" />
        </Route>
        <Route path="/">
          <IFrame src="//localhost/acton/ng-ui/dashboard" />
        </Route>
      </Switch>
    </Router>
  )
}
