import axios from 'axios'

export async function makeQuery(endpoint: string) {
  try {
    // Ensure endpoint starts with a single slash
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

    // Make the request to the proxy
    const res = await axios.get(`/api/proxy${formattedEndpoint}`)

    console.log('API Response:', res.data)
    return res.data // Return only data instead of full response
  } catch (error) {
    console.error('API Error:', error)
    throw error // Let the caller handle the error
  }
}
