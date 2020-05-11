if ((window as any)['isProd']) {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}
