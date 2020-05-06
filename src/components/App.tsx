import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navigation from './Navigation'

import Home from "../views/Home"
import LandingPages from "../views/LandingPages"

import './app.scss'

export default function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/landing-pages">
          <LandingPages />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
