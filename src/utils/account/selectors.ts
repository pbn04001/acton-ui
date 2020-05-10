import { AccountState } from './reducer'

export const getAccount = (state): AccountState => state?.account ?? {}
