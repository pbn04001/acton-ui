import { isProd } from 'env'

if (isProd()) {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
