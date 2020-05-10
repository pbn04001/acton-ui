import api from 'utils/api'

const AccountService = {
  getAccountSettings: () => api.doFetch('accountSettings', { method: 'GET' })
}

export default AccountService
