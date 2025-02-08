import axios from 'axios'

export default async function handler(req, res) {
  try {
    // Debugging: Print incoming request info
    console.log('Incoming Request:', req.method, req.query)

    const { endpoint } = req.query

    if (!endpoint) {
      console.error('Missing endpoint parameter!')
      return res.status(400).json({ error: 'Missing endpoint parameter' })
    }

    // Ensure endpoint is properly formatted
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const apiUrl = `https://api-anikii.onrender.com${formattedEndpoint}`

    console.log(`Forwarding request to: ${apiUrl}`) // Debugging

    // Fetch data from backend API
    const response = await axios.get(apiUrl)

    // Return response to frontend
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Proxy Error:', error?.message)

    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch data',
      details: error?.message,
    })
  }
}
