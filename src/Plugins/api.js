import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    common: {
      'Authorization': `Bearer ${Cookies.get(process.env.REACT_APP_TOKEN)}`
    }
  }
})
export default api