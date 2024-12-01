<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="layout">
    <header>
      <p>It's time to write some notes.</p>
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <p id="copyright">Copyright © Note 2024 | All Rights Reserved.</p>
      <a href="https://www.instagram.com/" target="_blank"
        ><img src="../assets/instagram.png" alt="" id="instagram"
      /></a>
    </footer>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
#layout {
  min-height: 100dvh;
  header {
    background-color: general.$lightGreen;
    p {
      text-align: center;
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
    color: general.$lightColor;
  }
}
</style>
