import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Navigation from '../navigation/Navigation'
import IFrameViews, { getInternalAddressFromCurrent } from '../../views/IFrameViews'
import IFrame from '../iframe/IFrame'
import actions, { AccountActions } from '../../utils/account/actions'
import mapStateToProps, { AppStateProps } from './state/mapStateToProps'
import Svg from '../Svg'

import './app.scss'

const rootClass = 'app'

const App: React.FC<AccountActions & AppStateProps> = (props: AccountActions & AppStateProps) => {
  const { loadAccount, account } = props
  const { loading, results, accountSettings } = account

  useEffect(() => {
    loadAccount()
  }, [])

  if (results?.error) {
    return <div>Error Occurred</div>
  } else if (loading || accountSettings === null) {
    return (
      <div className={`${rootClass}__loading`}>
        <Svg name="spinner" />
      </div>
    )
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

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(App)
