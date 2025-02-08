import axios from 'axios'

export async function makeQuery(endpoint: string) {
  const res = await axios.get(`/api/proxy${endpoint}`)
  console.log(res)

  return res
}
