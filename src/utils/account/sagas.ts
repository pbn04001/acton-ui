import { call, put, takeLatest } from 'redux-saga/effects'
import runSagas from 'store/sagas'
import accountServices from './service'
import { loadAccountActions } from './actions'
import { loadAccountActionTypes } from './reducer'
import { isDebug } from 'env'

export function* loadAccountSettings() {
  try {
    const results = yield call(accountServices.getAccountSettings)
    yield put(loadAccountActions.receive(results))
  } catch (err) {
    if (isDebug()) {
      console.error(err) // eslint-disable-line no-console
    }
    yield put(loadAccountActions.fail(err))
  }
}

export function* addWatchers() {
  yield takeLatest(loadAccountActionTypes.REQUEST, loadAccountSettings)
}

runSagas(addWatchers)
