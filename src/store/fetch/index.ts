import { INITIAL, LOADING, SUCCESS, ERROR } from './status'
import { Action } from 'interface/Action'

export const makeFetchActionTypes = (namespace: string) => ({
  REQUEST: `${namespace}/REQUEST`,
  RECEIVE: `${namespace}/RECEIVE`,
  FAIL: `${namespace}/FAIL`,
  RESET: `${namespace}/RESET`
})

export interface FetchActionCreators<T> {
  request(payload?: T): Action<T>
  receive(payload?: T): Action<T>
  fail(payload?: T): Action<T>
  reset(): Action<T>
}

export function makeFetchActionCreators<T = undefined>(namespace: string): FetchActionCreators<T> {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)
  return {
    request: (payload?): Action<T> => ({
      type: REQUEST,
      payload
    }),
    receive: (payload?): Action<T> => ({
      type: RECEIVE,
      payload
    }),
    fail: (error?): Action<T> => ({
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

export function makeFetchReducer<T>(namespace: string) {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)

  const fetchReducer = (state = initialState(), action: Action<T>) => {
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
