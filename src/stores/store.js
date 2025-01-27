import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import myAxios from './my-axios'

export const useAuthStore = defineStore('auth', () => {
  const username = ref(sessionStorage.getItem('name'))
  const isLogin = ref(sessionStorage.getItem('token'))
  const memberId = ref(sessionStorage.getItem('id'))
  const isLoading = ref(true)
  const message = ref('')
  const handleRegister = (name, email, password, passwordConfirm) => {
    message.value = 'wait...'

    myAxios
      .post('/api/register', {
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
      })
      .catch((err) => console.log(err))
  }
  const handleLogIn = (email, password) => {
    message.value = 'wait...'

    myAxios
      .post('/api/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        message.value = ''
        sessionStorage.setItem('token', document.cookie.slice(document.cookie.indexOf('=') + 1))
        isLogin.value = sessionStorage.getItem('token')
        sessionStorage.setItem('id', res.data[0].id)
        memberId.value = sessionStorage.getItem('id')
        sessionStorage.setItem('name', res.data[0].name)
        username.value = sessionStorage.getItem('name')
        console.log(res)

        router.push({ path: '/list' })
      })
      .catch((err) => {
        if (err['response']['data']['message'] === 'These credentials do not match our records.') {
          message.value = 'Incorrect username or password.'
        }
        console.log(err)
      })
  }
  const handleLogout = () => {
    myAxios
      .post('/api/logout')
      .then(() => {
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
        memberId.value = sessionStorage.getItem('id')
        isLogin.value = sessionStorage.getItem('token')
        username.value = sessionStorage.getItem('name')
        router.push({ path: '/' })
      })
      .catch((err) => console.log(err))
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
  const note = ref({})
  const message = ref('')
  const getList = () => {
    isLoading.value = true
    myAxios
      .get('/api/notes', { params: { id: sessionStorage.getItem('id') } })
      .then((res) => {
        notes.value = res.data
        isLoading.value = false
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  const get = (id) => {
    isLoading.value = true
    myAxios
      .get('/api/note/' + id)
      .then((res) => {
        note.value = res.data[0]
        isLoading.value = false
        console.log(res)
      })
      .catch((err) => console.log(err))
  }
  const add = (subject, content, date, images) => {
    let data = new FormData()
    data.append('user_id', sessionStorage.getItem('id'))
    data.append('subject', subject)
    data.append('content', content)
    data.append('date', date)
    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i])
    }
    console.log(data.getAll('images'))

    /*  message.value = 'wait...'
    isLoading.value = true
    myAxios
      .post('/api/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.data == 2) {
          message.value = 'database error.'
          isLoading.value = false
          console.log(res)
          return
        }
        message.value = ''
        isLoading.value = false
        console.log(res)
        location = '/list'
      })
      .catch((err) => console.log(err)) */
  }
  return {
    isLoading,
    notes,
    note,
    message,
    getList,
    get,
    add,
  }
})
