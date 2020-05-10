if (window['__PROD__']) {
  module.exports = require('./prod.env')
} else {
  module.exports = require('./dev.env')
}

interface Environment {
  endpoints: object
}

const paramRegex = /^(.*)(\{.*\})(.*)$/

const paramMap = { systemWideUrlVariable: () => 'value' }

const getParamDefaultValue = (paramName) => (paramMap[paramName] ? paramMap[paramName]() : null)

export default {
  resolveApiRoute: function (name, urlParams = {}, queryParams = {}) {
    // get route
    const env = window['env'] as Environment
    let route = env.endpoints[name]

    if (!name || !route) {
      throw new Error(`utils/env/resolveApiRoute Error Unable to resolve route, name: ${name}, route: ${route}`) // eslint-disable-line max-len
    }

    // add url params
    let pieces
    while ((pieces = route.match(paramRegex))) {
      const [, prePiece, paramPiece, postPiece] = pieces

      const paramName = paramPiece.slice(1, -1)
      let paramValue = urlParams.hasOwnProperty(paramName) ? urlParams[paramName] : this[paramName]
      if (!paramValue) paramValue = getParamDefaultValue(paramName)

      if (paramValue === undefined) {
        throw new Error(`Error Unable to resolve parameter: "${paramName}" - ${name} => ${route}`)
      }

      route = prePiece + paramValue + postPiece
    }

    // add query params
    let queryString = route.includes('?') ? '&' : '?'
    Object.keys(queryParams).forEach((key) => {
      queryString = `${queryString}${key}=${encodeURIComponent(queryParams[key])}&`
    })

    if (queryString.length > 1) {
      route = `${route}${queryString.slice(0, -1)}`
    }

    return route
  }
}
