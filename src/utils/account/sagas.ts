import { call, put, takeLatest, select, spawn } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import accountServices from './service'
import { loadAccountActions } from './actions'
import { loadAccountActionTypes } from './reducer'

export function* loadAccountSettings() {
  try {
    const results = yield call(accountServices.getAccountSettings)
    yield put(loadAccountActions.receive(results))
  } catch (err) {
    if (window['__DEBUG__']) {
      console.error(err) // eslint-disable-line no-console
    }
    yield put(loadAccountActions.fail(err))
  }
}

export function* addWatchers() {
  yield takeLatest(loadAccountActionTypes.REQUEST, loadAccountSettings)
}

runSagas(addWatchers)
