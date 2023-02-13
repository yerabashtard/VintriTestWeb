import { config } from './config.js'
import axios from 'axios'

/**
 * Functions in this file are used to send and receive data from the Beer server
 */
export default {
  /**
   * Get beer by name from the beer server.
   *
   * @param email - Email address of the requesting user
   * @param name - Name of the beer that is being searched for
   */
  async getBeer (email, name) {
    const GET_BEER_PATH = `/beers/${name}`
    const url = _getUrl(GET_BEER_PATH)
    const headers = {}
    headers['Accept'] = 'application/json'
    const options = {}
    options.headers = _getAuthHeader(headers, email)
    try {
      const response = await axios.get(url.toString(), options)
      return response.data
    } catch (err) {
      console.error(`There was an error trying to GET from ${url}. Response code was: ${err.response?.status}`)
      throw err
    }
  },

  /**
   * Create a new rating for a beer identified by the beerId in the Beer server
   *
   * @param email - Email address of the requesting user
   * @param beerId - Id of the beer to create a rating for
   * @param body - Body that should be sent with the Post call
   */
  async createRating (email, beerId, body) {
    const POST_RATING_PATH = `/beers/rate/${beerId}`
    const url = _getUrl(POST_RATING_PATH)
    const headers = {}
    headers['Content-type'] = 'application/json'
    const options = {}
    options.headers = _getAuthHeader(headers, email)
    try {
      const response = await axios.post(url.toString(), body, options)
      return response.status
    } catch (err) {
      console.error(`There was an error trying to POST to ${url}. Response code was: ${err.response?.status}`)
      throw err
    }
  }
}

/**
 * Build a URL object to avoid issues when building urls using string appending. One example is having to
 * account for a trailing / which the URL class will take care of.
 *
 * @param path - Optional parameter that indicates the path of the url that is desired
 * @param queryParams - Optional object that can be used be to add query parameters to the request url
 * @returns {URL} - URL object that was created
 * @private
 */
const _getUrl = (path, queryParams) => {
  const url = new URL(config.beerServerUrl)
  url.pathname = path
  const searchParams = new URLSearchParams(queryParams)
  // toString should url encode here
  url.search = searchParams.toString()
  return url
}

/**
 * This function will return an object with the required x-user header that can be used to authenticate with
 * the Beer Server API. If an existing headers object is provided the x-user header will be added to it,
 * otherwise a new object is returned.
 *
 * @param headersObj - Optional headers object
 * @param email - Required for the x-user header
 * @private
 */
const _getAuthHeader = (headersObj = {}, email) => {
  headersObj['x-user'] = email
  return headersObj
}
