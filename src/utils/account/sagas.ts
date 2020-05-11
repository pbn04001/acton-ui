import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import { logError } from 'env'
import accountServices from './service'
import { loadAccountActions } from './actions'
import { loadAccountActionTypes } from './reducer'

export function* loadAccountSettings() {
  try {
    const results = yield call(accountServices.getAccountSettings)
    yield put(loadAccountActions.receive(results))
  } catch (err) {
    logError(err)
    yield put(loadAccountActions.fail(err))
  }
}

export function* addWatchers() {
  yield takeLatest(loadAccountActionTypes.REQUEST, loadAccountSettings)
}

runSagas(addWatchers)
