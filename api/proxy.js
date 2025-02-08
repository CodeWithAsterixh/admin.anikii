import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { endpoint } = req.query
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' })
    }
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const apiUrl = `https://api-anikii.onrender.com${formattedEndpoint}`

    const response = await axios.get(apiUrl)
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Proxy Error:', error?.message)
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch data',
      details: error?.message,
    })
  }
}
