import axios from 'axios'

export const fetchItem = () => {
  return axios.get('http://localhost:9091/api/items')
}