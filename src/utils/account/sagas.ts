import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import { logError } from 'env'
import accountServices from './service'
import { loadAccountActions } from './actions'
import { loadAccountActionTypes } from './reducer'
import AccountSettings from '../../interface/AccountSettings'

export function* loadAccountSettings() {
  try {
    const accountSettings:AccountSettings = yield call(accountServices.getAccountSettings)
    //debugger
    //const dynamicNav:DynamicNav = yield call(accountServices.getDynamicNav, accountSettings.dynamicNavUrl)
    yield put(loadAccountActions.receive({
      accountSettings
    }))
  } catch (err) {
    logError(err)
    yield put(loadAccountActions.fail(err))
  }
}

export function* addWatchers() {
  yield takeLatest(loadAccountActionTypes.REQUEST, loadAccountSettings)
}

runSagas(addWatchers)
