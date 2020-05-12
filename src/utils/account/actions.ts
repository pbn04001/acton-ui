import { makeFetchActionCreators } from '../../store/fetch'
import { LOAD_ACCOUNT, NAMESPACE } from './constants'
import { ActionCreatorsMapObject } from 'redux'
import { Action } from '../../interface/Action'
import {AccountPayload} from './reducer'

export const loadAccountActions = makeFetchActionCreators<undefined, AccountPayload>(`${NAMESPACE}/${LOAD_ACCOUNT}`)

export interface AccountActions extends ActionCreatorsMapObject {
  loadAccount(): Action
}

const actions: AccountActions = { loadAccount: loadAccountActions.request }

export default actions
