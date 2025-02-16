import axios from 'axios'

export async function makeQuery(
  endpoint: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  type: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
) {
  try {
    // for dev only
    if (import.meta.env.DEV) {
      switch (type) {
        case 'GET':
          return await axios.get(`/api${endpoint}`)
        case 'POST':
          return await axios.post(`/api${endpoint}`, data)
        case 'DELETE':
          return await axios.delete(`/api${endpoint}`)
        case 'PUT':
          return await axios.put(`/api${endpoint}`)

        default:
          break
      }
    }

    // for prod
    switch (type) {
      case 'GET':
        return await axios.get('/api/proxy', { params: { endpoint } })
      case 'POST':
        return await axios.post(
          `/api/proxy?endpoint=${encodeURIComponent(endpoint)}&type=${type}`,
          data,
        )
      case 'DELETE':
        return await axios.delete('/api/proxy', { params: { endpoint } })
      case 'PUT':
        return await axios.put('/api/proxy', { params: { endpoint } })

      default:
        break
    }
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
