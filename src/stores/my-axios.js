import axiosLib from 'axios'
import Cookies from 'js-cookie'

const baseUrl = 'https://note-site-backend.vercel.app/'
const myAxios = axiosLib.create({
  baseURL: baseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
})

myAxios.defaults.withCredentials = true

myAxios.interceptors.request.use(async (config) => {
  if (config.method.toLowerCase() !== 'get') {
    await myAxios.get('sanctum/csrf-cookie').then()
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
  }
  return config
})

export default myAxios
