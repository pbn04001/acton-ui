import { getAccount } from '../../../utils/account/selectors'
import { AccountState } from 'utils/account/reducer'

export interface AppStateProps {
  account: AccountState
}

function mapStateToProps(state: any): AppStateProps {
  return { account: getAccount(state) }
}

export default mapStateToProps
