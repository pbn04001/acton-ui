import humps from 'humps'
import env from 'env'
import { loadLogin } from '../iframe'

const UNAUTHORIZED = 401

const validateStatus = (response: Response) => {
  if (response.status < 200 || response.status >= 300) {
    throw Object.assign(new Error(response.statusText), {
      data: response,
      status: response.status
    })
  }
}

const composeResponse = (prevResponse: Response, assignToProp: string, prevProps = {}) => (response: Response) => {
  let appended
  if (response instanceof Array) {
    appended = response.map((child) => ({
      ...child,
      ...prevProps
    }))
  } else {
    appended = {
      ...response,
      ...prevProps
    }
  }
  return {
    ...prevResponse,
    [assignToProp]: appended
  }
}

interface Options {
  method?: string
  headers?: object
  urlParams?: { [key: string]: string }
  jsonOutput?: boolean
  camelizeKeys?: boolean
  shouldValidateStatus?: boolean
  queryParams?: { [key: string]: string }
  body?: object
}

const DEFAULT_OPTIONS: Options = {
  // Fetch options
  method: 'GET',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'cache-control': 'no-store no-cache',
    Pragma: 'no-cache'
  },
  urlParams: {},

  // Handling response options
  jsonOutput: true, // Transform response to JSON
  camelizeKeys: true, // For json output, camelize response keys with humps library
  shouldValidateStatus: true // Ensure a 200 status response
}

/* doFetch - A standard way of interacting with our APIs, this function
 * takes cares of many common behaviors such as validating response
 * status, fixing authentication errors, camelizing response JSONs, creating
 * short term authenticatdion cookies, and resolving API routes.
 *
 * Parameters
 * ----------
 * path:    A named route from the ENV config.
 * options: See annotated default options above
 */
function doFetch(routeName: string, options: Options = {}) {
  const { jsonOutput, camelizeKeys, shouldValidateStatus, urlParams, queryParams } = {
    ...DEFAULT_OPTIONS,
    ...options
  }

  const headers = {
    ...DEFAULT_OPTIONS.headers,
    ...options.headers
  }

  // Shims browser supports web fetch but not URLSearchParams
  // Manually set the header to `application/x-www-form-urlencoded; charset=UTF-8`
  // - https://github.com/jerrybendy/url-search-params-polyfill#known-issues.
  if (options.body instanceof URLSearchParams) {
    ;(headers as any)['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  const routeUrl = env.resolveApiRoute(routeName, urlParams, queryParams)

  return new Promise((resolve, reject) => {
    fetch(routeUrl, headers)
      .then((response) => {
        if (shouldValidateStatus) {
          validateStatus(response)
        }
        return response
      })
      .then((response) => {
        const ret = response
        if (jsonOutput) {
          const json = ret.json()

          if (camelizeKeys) {
            return json.then((jsonIter) => humps.camelizeKeys(jsonIter))
          }
          return json
        }
        return ret
      })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
        // Any 401 anywhere assumes user has expired auth
        if (error.status === UNAUTHORIZED) {
          loadLogin()
        }
      })
  })
}

export default {
  doFetch,
  composeResponse
}

export { validateStatus }
