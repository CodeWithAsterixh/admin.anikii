import axios from 'axios'

export async function makeQuery(endpoint: string) {
  try {
    // for dev only
    if (import.meta.env.DEV) {
      const res = await axios.get(`/api${endpoint}`)
      return res
    }

    // for prod
    const res = await axios.get('/api/proxy', { params: { endpoint } })

    return res // Return only JSON data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
