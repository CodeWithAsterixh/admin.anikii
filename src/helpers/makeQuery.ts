import axios from 'axios'

export async function makeQuery(endpoint: string) {
  const res = await axios.get(`https://api-anikii.onrender.com${endpoint}`)

  return res
}
