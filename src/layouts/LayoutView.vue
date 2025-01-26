<script setup>
import { useAuthStore } from '@/stores/store'
import { RouterLink, RouterView } from 'vue-router'
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.handleLogout()
}
</script>

<template>
  <div id="layout">
    <header>
      <p>
        {{
          authStore.username
            ? 'Welcome ' + authStore.username + '!'
            : "It's time to write some notes."
        }}
      </p>
      <section id="function">
        <router-link to="/create">💡</router-link>
        <button id="logout" @click="handleLogout">🚪</button>
      </section>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <p id="copyright">Copyright © EricWoo 2024 | All Rights Reserved.</p>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
#layout {
  min-height: 100dvh;
  header,
  footer {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 5dvh;
  }
  p {
    font-size: 18px;
  }
  header {
    background-color: general.$lightGreen;
    #function {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      * {
        background: none;
        border: none;
        text-decoration: none;
        cursor: pointer;
        font-size: 1.5rem;
        margin-inline-start: 3px;
      }
    }
    p {
      color: general.$darkGreen;
    }
  }
  main {
    display: grid;
    place-items: center;
    min-height: 90dvh;
    background-color: general.$lightColor;
  }
  footer {
    background-color: general.$darkGreen;
    p {
      color: general.$lightColor;
    }
  }
}
</style>
