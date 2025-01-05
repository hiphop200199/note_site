import axiosLib from 'axios'
import Cookies from 'js-cookie'

const myAxios = axiosLib.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
  },
})

myAxios.defaults.withCredentials = true

myAxios.interceptors.request.use(async (config) => {
  if (config.method.toLowerCase() !== 'get') {
    await myAxios.get('/api/sanctum/csrf-cookie').then()
    config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN')
  }
  return config
})

export default myAxios
