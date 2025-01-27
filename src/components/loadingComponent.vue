<template>
  <img id="loading" src="/src/assets/loading.png" alt="" />
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
#loading {
  max-width: 200px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  to {
    rotate: 2turn;
  }
}
</style>
