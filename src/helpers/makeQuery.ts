import axios from 'axios'

export async function makeQuery(endpoint: string) {
  const res = await axios.get(`${endpoint}`)

  return res
}
