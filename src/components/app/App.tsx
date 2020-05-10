import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Navigation from '../Navigation'
import IFrameViews, { getInternalAddressFromCurrent } from '../../views/IFrameViews'
import IFrame from '../IFrame'

import './app.scss'
import actions, { AccountActions } from '../../utils/account/actions'
import mapStateToProps, { AppStateProps } from './state/mapStateToProps'

interface AppProps extends AccountActions, AppStateProps {}

const App: React.FC<AppProps> = (props: AppProps) => {
  const {
    loadAccount,
    account
  } = props

  const {
    loading,
    results,
    accountSettings
  } = account

  useEffect(() => {
    loadAccount()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  } else if (results?.error) {
    return <div>Error</div>
  }

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

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(App)
