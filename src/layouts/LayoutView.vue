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
    </footer>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
#layout {
  min-height: 100dvh;
  header,
  footer {
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
