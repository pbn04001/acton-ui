if (window['__PROD__']) {
    module.exports = require('./configureStore.prod'); // eslint-disable-line
} else {
    module.exports = require('./configureStore.dev'); // eslint-disable-line
}
