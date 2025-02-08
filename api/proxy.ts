import axios from 'axios'

export default async function handler(req, res) {
  try {
    // Get the path from the query parameters
    const { endpoint } = req.query

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' })
    }

    // Ensure endpoint starts with aghjk
    //  slash
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

    // Construct the full backend URL
    const apiUrl = `https://api-anikii.onrender.com${formattedEndpoint}`

    console.log(`Forwarding request to: ${apiUrl}`) // Debugging

    // Fetch data from the backend API
    const response = await axios.get(apiUrl)

    // Send the response back to the client
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Proxy Error:', error)
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch data' })
  }
}
