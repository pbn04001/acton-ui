if ((window as any)['isProd']) {
  module.exports = require('./prod.env')
} else {
  module.exports = require('./dev.env')
}
