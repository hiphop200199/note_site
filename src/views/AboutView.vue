<script setup></script>
<template>
  <div id="about-box">
    <h1>About me</h1>
    <img src="../assets/pen-filled-writing-tool.png" alt="" />
    <p>
      Hi!I'm Eric.I am a web developer,at first i learned coding by myself,then i found that it's so
      amazing the process of creating app is,so i went to bootcamp and made website together with
      friends,after that i started my dev journey till now.I'll keep learning new technology and
      creating more interesting apps!
    </p>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
#about-box {
  position: relative;
  width: 80%;
  max-width: 400px;
  * {
    margin-block: 5px;
  }
  h1 {
    color: general.$darkGreen;
  }
  img {
    width: 50px;
  }
  p {
    color: general.$darkGreen;
    font-size: 20px;
    &::first-letter {
      font-size: 28px;
      font-weight: 700;
    }
  }
}
</style>
