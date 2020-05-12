import api from 'utils/api'

const AccountService = {
  getAccountSettings: () => api.doFetch('accountSettings'),
  getDynamicNav: (url: string) => api.doFetch(url)
}

export default AccountService
