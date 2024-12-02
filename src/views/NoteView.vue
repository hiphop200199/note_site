<script setup></script>

<template>
  <div class="box-layout">
    <h1>Lorem, ipsum.</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem quidem nostrum sit aperiam
      officiis corrupti illo, voluptates maiores consequatur repellendus.
    </p>
    <section id="tags">
      <span class="tag">#Normal</span><span class="tag">#HTML</span><span class="tag">#Css</span>
    </section>
    <span>2022-03-22</span>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
.box-layout {
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
  #tags {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    .tag {
      background-color: general.$darkGreen;
      color: general.$lightColor;
      padding: 5px;
      margin-inline-start: 5px;
      font-weight: 700;
    }
  }
  span {
    display: block;
    color: general.$darkGreen;
    text-align: end;
    font-weight: 500;
  }
}
</style>
