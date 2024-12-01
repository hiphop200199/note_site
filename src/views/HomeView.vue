<script setup></script>

<template>
  <div>
    <form @submit="handleLogin($event, account, password)">
      <h1>Login right now!</h1>
      <input type="email" placeholder="email..." v-model="account" required />
      <input type="password" placeholder="password..." v-model="password" required />
      <p id="message" ref="message"></p>
      <div id="buttons">
        <button type="submit">login</button>
        <router-link to="/register"><button>register</button></router-link>
      </div>
      <router-link to="/forgot-password">forgot password?</router-link>
    </form>
  </div>
</template>
<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
