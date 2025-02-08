import axios from 'axios'

export async function makeQuery(endpoint: string) {
  const res = await axios.get(`/api${endpoint}`)

  return res
}
