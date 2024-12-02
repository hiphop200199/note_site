import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = 'http://localhost:8000/'

export const useAuthStore = defineStore('auth', () => {
  const isLogin = ref(sessionStorage.getItem('token'))
  const isLoading = ref(true)
  const message = ref('')
  const handleRegister = (name, email, password, passwordConfirm) => {
    message.value = 'wait...'
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirm,
        })
        .then((res) => {
          console.log(res)
          message.value = ''
          sessionStorage.setItem('token', document.cookie.slice(document.cookie.indexOf('=') + 1))
          isLogin.value = sessionStorage.getItem('token')
          router.push({ path: '/' })
          //location.href = location.origin + '/eric_bookstore/'
        })
        .catch((err) => console.log(err))
    })
  }
  const handleLogIn = (email, password) => {
    message.value = 'wait...'
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'login', {
          email: email,
          password: password,
        })
        .then((res) => {
          message.value = ''
          sessionStorage.setItem('token', document.cookie.slice(document.cookie.indexOf('=') + 1))
          isLogin.value = sessionStorage.getItem('token')
          console.log(res)

          router.push({ path: '/' })
          //location.href = location.origin + '/eric_bookstore/'
        })
        .catch((err) => {
          if (
            err['response']['data']['message'] === 'These credentials do not match our records.'
          ) {
            message.value = '帳號或密碼有誤'
          }
          console.log(err)
        })
    })
  }
  const handleLogout = () => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'logout')
        .then(() => {
          sessionStorage.removeItem('token')
          isLogin.value = sessionStorage.getItem('token')
          //router.push({ path: '/' })
          location.href = location.origin + '/note_site/'
        })
        .catch((err) => console.log(err))
    })
  }

  return {
    isLoading,
    isLogin,
    message,
    handleRegister,
    handleLogout,
    handleLogIn,
  }
})

export const useNoteStore = defineStore('note', () => {
  const isLoading = ref(true)
  const notes = ref([])
  const getNotes = () => {
    isLoading.value = true
    axios
      .get(baseUrl + 'getNotes', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        items.value = res.data
        total.value = res.data.reduce(function (a, c) {
          return a + c.price * c.amount
        }, 0)
        isLoading.value = false
        console.log(res, total.value)
      })
      .catch((err) => console.log(err))
  }
  const addItem = (id, mode) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'addItem', {
          id: id,
          memberId: sessionStorage.getItem('id'),
        })
        .then((res) => {
          console.log(res)

          if (mode === 'P') {
            router.push({ path: '/cart' })
          } else {
            router.push({ path: '/list' })
          }
          isLoading.value = false
          product.isLoading = false
        })
        .catch((err) => console.log(err))
    })
  }
  const removeItem = (id) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .delete(baseUrl + 'removeItem', {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }
  const adjustAmount = (id, amount) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .put(baseUrl + 'editItem', {
          id: id,
          amount: amount,
        })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }

  return {
    isLoading,
    items,
    total,
    getItems,
    addItem,
    removeItem,
    adjustAmount,
  }
})

export const useTagStore = defineStore('note', () => {
  const isLoading = ref(true)
  const items = ref([])
  const total = ref(0)
  const getItems = () => {
    isLoading.value = true
    axios
      .get(baseUrl + 'getItems', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        items.value = res.data
        total.value = res.data.reduce(function (a, c) {
          return a + c.price * c.amount
        }, 0)
        isLoading.value = false
        console.log(res, total.value)
      })
      .catch((err) => console.log(err))
  }
  const addItem = (id, mode) => {
    let product = useProductStore()
    product.isLoading = true //使用別的store裡的屬性時，直接賦值即可
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'addItem', {
          id: id,
          memberId: sessionStorage.getItem('id'),
        })
        .then((res) => {
          console.log(res)

          if (mode === 'P') {
            router.push({ path: '/cart' })
          } else {
            router.push({ path: '/list' })
          }
          isLoading.value = false
          product.isLoading = false
        })
        .catch((err) => console.log(err))
    })
  }
  const removeItem = (id) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .delete(baseUrl + 'removeItem', {
          params: {
            id: id,
          },
        })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }
  const adjustAmount = (id, amount) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .put(baseUrl + 'editItem', {
          id: id,
          amount: amount,
        })
        .then((res) => {
          window.location.reload()
        })
        .catch((err) => console.log(err))
    })
  }
  const handleCheckout = (name, tel, address) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'checkout', {
          id: sessionStorage.getItem('id'),
          receiverName: name,
          receiverTel: tel,
          receiverAddress: address,
        })
        .then((res) => {
          console.log(res)
          window.location.href = res.data.url
        })
        .catch((err) => console.log(err))
    })
  }
  const checkoutSuccess = (id) => {
    isLoading.value = true
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .put(baseUrl + 'success', {
          session_id: id,
          id: sessionStorage.getItem('id'),
        })
        .then((res) => {
          console.log(res)
          isLoading.value = false
        })
        .catch((err) => console.log(err))
    })
  }
  return {
    isLoading,
    items,
    total,
    getItems,
    addItem,
    removeItem,
    adjustAmount,
    handleCheckout,
    checkoutSuccess,
  }
})
