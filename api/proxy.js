import axios from 'axios'

export default async function handler(req, res) {
  try {
    const { endpoint, type } = req.query
    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint parameter' })
    }
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    const apiUrl = `https://api-anikii.onrender.com${formattedEndpoint}`

    let response

    if (type.toLowerCase() === 'get') {
      response = await axios.get(apiUrl)
    } else if (
      type.toLowerCase() === 'post' ||
      type.toLowerCase() === 'put' ||
      type.toLowerCase() === 'delete'
    ) {
      response = await axios.post(apiUrl, req.body)
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid type parameter. Use "get", "post", or "delete".' })
    }

    return res.status(200).json(response.data)
  } catch (error) {
    console.error('Proxy Error:', error?.message)
    return res.status(error.response?.status || 500).json({
      error: 'Failed to fetch data',
      details: error?.message,
    })
  }
}
