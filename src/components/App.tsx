import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '../views/home/Home'
import Navigation from './Navigation'

import './app.scss'

export default function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
