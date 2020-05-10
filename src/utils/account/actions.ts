import { makeFetchActionCreators } from 'store/fetch'
import { LOAD_ACCOUNT, NAMESPACE } from './constants'
import { ActionCreatorsMapObject } from 'redux'
import { Action } from '../../interface/Action'

export const loadAccountActions = makeFetchActionCreators(`${NAMESPACE}/${LOAD_ACCOUNT}`)

export interface AccountActions extends ActionCreatorsMapObject {
  loadAccount(payload?: any): Action
}

const actions: AccountActions = { loadAccount: loadAccountActions.request }

export default actions
