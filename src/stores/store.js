import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const baseUrl = 'https://note-site-backend.vercel.app/'

export const useAuthStore = defineStore('auth', () => {
  const username = ref(sessionStorage.getItem('name'))
  const isLogin = ref(sessionStorage.getItem('token'))
  const memberId = ref(sessionStorage.getItem('id'))
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
          sessionStorage.setItem('id', res.data[0].id)
          memberId.value = sessionStorage.getItem('id')
          sessionStorage.setItem('name', res.data[0].name)
          username.value = sessionStorage.getItem('name')
          router.push({ path: '/list' })
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
          /*  sessionStorage.setItem('id', res.data[0].id)
          memberId.value = sessionStorage.getItem('id')
          sessionStorage.setItem('name', res.data[0].name)
          username.value = sessionStorage.getItem('name') */
          console.log(res)

          router.push({ path: '/list' })
          //location.href = location.origin + '/eric_bookstore/'
        })
        .catch((err) => {
          /*  if (
            err['response']['data']['message'] === 'These credentials do not match our records.'
          ) {
            message.value = '帳號或密碼有誤'
          } */
          console.log(err)
        })
    })
  }
  const handleLogout = () => {
    axios.get(baseUrl + 'sanctum/csrf-cookie').then(() => {
      axios
        .post(baseUrl + 'logout')
        .then(() => {
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('name')
          memberId.value = sessionStorage.getItem('id')
          isLogin.value = sessionStorage.getItem('token')
          username.value = sessionStorage.getItem('name')
          //router.push({ path: '/' })
          location.href = location.origin + '/note_site/'
        })
        .catch((err) => console.log(err))
    })
  }

  return {
    username,
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
      .get(baseUrl + 'notes', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        notes.value = res.data
        isLoading.value = false
        console.log(res)
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
    notes,
    getNotes,
    addItem,
    removeItem,
    adjustAmount,
  }
})
