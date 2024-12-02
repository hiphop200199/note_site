<script setup></script>

<template>
  <div class="box-layout">
    <h1>Note list.</h1>
    <section id="note-container">
      <a href="">it's time to go to bed.</a>
      <a href="">it's time to go to bed.</a>
      <a href="">it's time to go to bed.</a>
      <a href="">it's time to go to bed.</a>
      <a href="">it's time to go to bed.</a>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
.box-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 80%;
  max-width: 400px;
  * {
    margin-block: 5px;
  }
  h1 {
    color: general.$darkGreen;
  }
  #note-container {
    display: flex;
    flex-direction: column;
    a {
      text-decoration: none;
      color: general.$darkGreen;
      font-weight: 500;
      font-size: 20px;
    }
  }
}
</style>
