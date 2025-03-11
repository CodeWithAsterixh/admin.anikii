import axios from 'axios'

export async function makeQuery(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) {
  try {
    if (import.meta.env.DEV) {
      // Development: directly call the API route with the correct method and payload
      switch (type) {
        case 'GET':
          return await axios.get(`/api${endpoint}`, { params: data })
        case 'POST':
          return await axios.post(`/api${endpoint}`, data)
        case 'PUT':
          return await axios.put(`/api${endpoint}`, data)
        case 'DELETE':
          return await axios.delete(`/api${endpoint}`)
        default:
          throw new Error(`Unsupported method: ${type}`)
      }
    } else {
      // Production: call the proxy endpoint with query parameters for endpoint and type
      const encodedEndpoint = encodeURIComponent(endpoint)
      switch (type) {
        case 'GET':
          return await axios.get('/api/proxy', {
            params: { endpoint: encodedEndpoint, type, ...data },
          })
        case 'POST':
          return await axios.post(`/api/proxy?endpoint=${encodedEndpoint}&type=${type}`, data)
        case 'PUT':
          return await axios.put(`/api/proxy?endpoint=${encodedEndpoint}&type=${type}`, data)
        case 'DELETE':
          return await axios.delete(`/api/proxy?endpoint=${encodedEndpoint}&type=${type}`)
        default:
          throw new Error(`Unsupported method: ${type}`)
      }
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
