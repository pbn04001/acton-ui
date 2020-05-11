import './config.env'

export function isProd(): boolean {
  // @ts-ignore
  return __PROD__
}

export function isDev(): boolean {
  // @ts-ignore
  return __DEV__
}

export function isDebug(): boolean {
  // @ts-ignore
  return __DEBUG__
}

export function logError(error: any) {
  if (isDebug()) {
    console.error(error) // eslint-disable-line no-console
  }
}

export function getEnv(): Environment {
  return (window as any)['env']
}

interface Environment {
  endpoints: {
    [key: string]: string
  }
}

const paramRegex = /^(.*)(\{.*\})(.*)$/

const paramMap: { [key: string]: () => string } = { systemWideUrlVariable: () => 'value' }

const getParamDefaultValue = (paramName: string) => (paramMap[paramName] ? paramMap[paramName]() : '')

function resolveApiRoute(name: string, urlParams: { [key: string]: string } = {}, queryParams: { [key: string]: string } = {}) {
  // get route
  const env = getEnv()
  let route: string = env.endpoints[name]

  if (!name || !route) {
    throw new Error(`utils/env/resolveApiRoute Error Unable to resolve route, name: ${name}, route: ${route}`) // eslint-disable-line max-len
  }

  // add url params
  let pieces
  while ((pieces = route.match(paramRegex))) {
    const [, prePiece, paramPiece, postPiece] = pieces

    const paramName = paramPiece.slice(1, -1)
    const paramValue = urlParams.hasOwnProperty(paramName) ? urlParams[paramName] : getParamDefaultValue(paramName)

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

export default {
  resolveApiRoute
}
