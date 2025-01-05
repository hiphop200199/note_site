import axiosLib from 'axios'
import Cookies from 'js-cookies'

const baseUrl = 'https://note-site-backend.vercel.app/'
const axios = axiosLib.create({
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
})

axios.defaults.withCredentials = true

axios.interceptors.request.use(async (config) => {
  if (config.method.toLowerCase() !== 'get') {
    await axios.get('sanctum/csrf-cookie').then()
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
  }
  return config
})

export default axios
