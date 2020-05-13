import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { legacyActonContext } from '../../const/globals'
import Navigation from '../Navigation'
import IFrameViews, { getInternalAddressFromCurrent } from '../../views/IFrameViews'
import IFrame from '../IFrame'
import actions, { AccountActions } from '../../utils/account/actions'
import mapStateToProps, { AppStateProps } from './state/mapStateToProps'
import Svg from '../Svg'

import './app.scss'

const rootClass = 'app'

const Index: React.FC<AccountActions & AppStateProps> = (props: AccountActions & AppStateProps) => {
  const { loadAccount, account } = props
  const { loading, results, accountSettings } = account

  useEffect(() => {
    loadAccount()
  }, [])

  const isError = results?.error !== undefined
  if (!isError && (loading || accountSettings === undefined)) {
    return (
      <div className={`${rootClass}__loading`}>
        <Svg name="spinner" />
      </div>
    )
  }

  let iframeUrl = `${legacyActonContext}/ng-ui/`
  if (isError) {
    iframeUrl = `${legacyActonContext}/account/login.jsp`
  } else if (accountSettings) {
    iframeUrl = `${legacyActonContext}/ng-ui/${getInternalAddressFromCurrent(accountSettings, window.location.pathname + window.location.search)}`
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
      <IFrame id="root-iframe" src={iframeUrl} />
    </>
  )
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch)

export default compose(connect(mapStateToProps, mapDispatchToProps))(Index)
