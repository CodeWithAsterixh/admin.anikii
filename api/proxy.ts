import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { endpoint } = req.query // Get the endpoint from the query params

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' })
    }

    const apiUrl = `https://api-anikii.onrender.com${endpoint}`
    const response = await axios.get(apiUrl)

    res.status(200).json(response.data)
  } catch (error) {
    console.error('Proxy Error:', error)
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch data' })
  }
}
