import axios from 'axios'

export default async function handler(req, res) {
  try {
    const response = await axios.get('https://api-anikii.onrender.com') // Replace with your actual API URL
    res.status(200).json(response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch data' })
  }
}
