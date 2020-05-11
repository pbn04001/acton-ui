import account from 'utils/account/reducer'
import pipelineReducers from '../store/pipelineReducer'
import { Action } from '../interface/Action'

const appReducer = pipelineReducers({ account })

const rootReducer = (state: any, action: Action): any => {
  const newState = state
  return appReducer(newState, action)
}

export default rootReducer
