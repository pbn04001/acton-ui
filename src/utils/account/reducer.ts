import { makeFetchActionTypes } from 'store/fetch'
import { LOAD_ACCOUNT, NAMESPACE } from './constants'

import './sagas'
import AccountSettings from '../../interface/AccountSettings'
import { Results } from '../../interface/Results'
import { Action } from '../../interface/Action'

export interface AccountPayload {
  accountSettings?: AccountSettings
  error?: Error
}

export const loadAccountActionTypes = makeFetchActionTypes(`${NAMESPACE}/${LOAD_ACCOUNT}`)

export interface AccountState {
  accountSettings?: AccountSettings
  loading?: boolean
  results?: Results
}

const initialState: AccountState = {
  accountSettings: undefined,
  loading: false,
  results: undefined
}

export function account(state = initialState, action: Action<AccountPayload>) {
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
        accountSettings: action.payload?.accountSettings,
        loading: false
      }
    case loadAccountActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        results: { error: action.payload?.error }
      }
    default:
      return state
  }
}

export default account
