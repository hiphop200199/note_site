<script setup>
import { useAuthStore } from '@/stores/store'
const authStore = useAuthStore()
let account = ''
let password = ''
const handleLogin = ($event, account, password) => {
  $event.preventDefault()
  authStore.handleLogIn(account, password)
}
</script>

<template>
  <div>
    <form @submit="handleLogin($event, account, password)">
      <h1>Login right now!</h1>
      <input type="email" placeholder="email..." v-model="account" required />
      <input type="password" placeholder="password..." v-model="password" required />
      <p id="message" ref="message">{{ authStore.message }}</p>
      <section id="buttons">
        <button type="submit">login</button>
        <router-link to="/register"><button>register</button></router-link>
      </section>
    </form>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: general.$darkGreen;
    margin-block-end: 20px;
    font-size: 36px;
  }
  :not(h1) {
    font-size: 20px;
  }
  input {
    outline: none;
    background-color: transparent;
    padding: 5px;
    border: 3px solid general.$darkGreen;
    margin-block-end: 3px;
    color: general.$darkGreen;
    accent-color: general.$darkGreen;
    &::placeholder {
      color: general.$darkGreen;
    }
    &:focus {
      border-color: general.$orange;
    }
  }
  #message {
    color: general.$darkGreen;
    margin-block: 20px;
    text-align: center;
  }
  #buttons {
    button {
      background-color: general.$darkGreen;
      border: none;
      color: general.$lightColor;
      padding: 5px;
      margin-inline: 5px;
      cursor: pointer;
      font-weight: 700;
    }
  }
  a {
    text-decoration: none;
    color: general.$darkGreen;
    margin-block-start: 20px;
  }
}
</style>
