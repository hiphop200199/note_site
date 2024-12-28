<script setup>
import { useAuthStore } from '@/stores/store'
import { onMounted, ref } from 'vue'
const authStore = useAuthStore()
const account = ref('')
const password = ref('')
const password_confirmation = ref('')
const name = ref('')

let handleRegister
onMounted(() => {
  handleRegister = ($event) => {
    $event.preventDefault()
    authStore.handleRegister(name.value, account.value, password.value, password_confirmation.value)
  }
})
</script>

<template>
  <div>
    <form @submit="handleRegister">
      <h1>Get an account!</h1>
      <input type="text" placeholder="name..." v-model="name" required maxlength="255" />
      <input type="email" placeholder="email..." v-model="account" required maxlength="255" />
      <input
        type="password"
        placeholder="password..."
        v-model="password"
        pattern="[A-Z]{1,}[a-z]{1,}[0-9]{1,}\W{1,}"
        title="須結合大小寫英文字母及數字以及特殊符號至少一個"
        required
        minlength="8"
      />
      <input
        type="password"
        placeholder="confirm password..."
        v-model="password_confirmation"
        pattern="[A-Z]{1,}[a-z]{1,}[0-9]{1,}\W{1,}"
        title="須結合大小寫英文字母及數字以及特殊符號至少一個"
        required
        minlength="8"
      />
      <p id="message" ref="message">{{ authStore.message }}</p>
      <div id="buttons">
        <button type="submit">register</button>
      </div>
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
