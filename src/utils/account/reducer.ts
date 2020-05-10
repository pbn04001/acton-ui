import { makeFetchActionTypes } from 'store/fetch'
import { LOAD_ACCOUNT, NAMESPACE } from './constants'

import './sagas'
import AccountSettings from '../../interface/AccountSettings'
import { Results } from '../../interface/Results'
import { Action } from '../../interface/Action'

export const loadAccountActionTypes = makeFetchActionTypes(`${NAMESPACE}/${LOAD_ACCOUNT}`)

export interface AccountState {
  accountSettings: AccountSettings | null
  loading?: boolean
  results: Results | null
}

const initialState: AccountState = {
  accountSettings: null,
  loading: false,
  results: null
}

export function minuteClinicsList(state = initialState, action: Action) {
  switch (action.type) {
    case loadAccountActionTypes.REQUEST:
      return {
        ...state,
        loading: true,
        results: null
      }
    case loadAccountActionTypes.RECEIVE:
      return {
        ...state,
        accountSettings: action.payload,
        loading: false
      }
    case loadAccountActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        results: { error: action.payload }
      }
    default:
      return state
  }
}

export default minuteClinicsList
