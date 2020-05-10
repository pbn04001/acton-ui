import {makeFetchActionCreators} from 'store/fetch'
import { LOAD_ACCOUNT, NAMESPACE } from './constants'

export const loadAccountActions = makeFetchActionCreators(`${NAMESPACE}/${LOAD_ACCOUNT}`)

export interface AccountActions {
  loadAccount(payload?: any): Action
}

const actions: AccountActions = {
  loadAccount: loadAccountActions.request
}

export default actions
