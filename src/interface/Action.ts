import { Action as ReduxAction } from 'redux'

export interface Action extends ReduxAction {
  type: string
  payload?: object
  error?: boolean
  meta?: any
}
