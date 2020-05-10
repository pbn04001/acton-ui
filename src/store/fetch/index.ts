import { INITIAL, LOADING, SUCCESS, ERROR } from './status'
import { Action } from '../../interface/Action'

export const makeFetchActionTypes = (namespace) => ({
  REQUEST: `${namespace}/REQUEST`,
  RECEIVE: `${namespace}/RECEIVE`,
  FAIL: `${namespace}/FAIL`,
  RESET: `${namespace}/RESET`
})

export interface FetchActionCreators {
  request(payload?: any): Action
  receive(payload?: any): Action
  fail(payload?: any): Action
  reset(payload?: any): Action
}

export const makeFetchActionCreators = (namespace): FetchActionCreators => {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)
  return {
    request: (payload = null): Action => ({
      type: REQUEST,
      payload
    }),
    receive: (payload): Action => ({
      type: RECEIVE,
      payload
    }),
    fail: (error): Action => ({
      type: FAIL,
      payload: error
    }),
    reset: () => ({ type: RESET })
  }
}

export const initialState = () => ({
  results: null,
  error: null,
  status: INITIAL
})

export const makeFetchReducer = (namespace) => {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)

  const fetchReducer = (state = initialState(), action: Action) => {
    switch (action.type) {
      case REQUEST: {
        return {
          ...state,
          results: null,
          error: null,
          status: LOADING
        }
      }

      case RECEIVE: {
        const { payload } = action
        return {
          ...state,
          results: payload,
          error: null,
          status: SUCCESS
        }
      }

      case FAIL: {
        const { payload } = action
        return {
          ...state,
          results: null,
          error: payload,
          status: ERROR
        }
      }

      case RESET:
        return initialState()

      default:
        return state
    }
  }

  return fetchReducer
}

export default {
  makeFetchActionTypes,
  makeFetchActionCreators,
  makeFetchReducer
}
