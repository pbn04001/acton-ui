import account from 'utils/account/reducer'
import pipelineReducers from 'store/pipelineReducer'

const appReducer = pipelineReducers({
  account
})

const rootReducer = (state, action) => {
  const newState = state
  return appReducer(newState, action)
}

export default rootReducer
