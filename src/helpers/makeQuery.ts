import axios from 'axios'

export async function makeQuery(endpoint: string) {
  try {
    const res = await axios.get('/api/proxy', { params: { endpoint } })

    return res.data // Return only JSON data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
