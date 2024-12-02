<script setup></script>

<template>
  <div>
    <form>
      <h1>New note.</h1>
      <input type="text" name="" id="" placeholder="subject..." />
      <textarea name="" id="" placeholder="content..."></textarea>
      <p>images.</p>
      <input type="file" name="" id="" multiple />
      <p>tags.</p>
      <select name="" id="" multiple>
        <option value="">Normal</option>
        <option value="">HTML</option>
        <option value="">Javascript</option>
        <option value="">Css</option>
        <option value="">Php</option>
      </select>
      <input type="date" name="" id="" />
      <button type="submit">create</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/general.scss';
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  * {
    margin-block: 5px;
  }
  h1 {
    color: general.$darkGreen;
    margin-block-end: 20px;
    font-size: 36px;
  }

  :not(h1) {
    font-size: 20px;
  }
  input,
  textarea,
  select {
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
    &[type='file'] {
      width: 20ch;
    }
  }
  p {
    font-weight: 700;
    color: general.$darkGreen;
  }
  #message {
    color: general.$darkGreen;
    margin-block: 20px;
    text-align: center;
  }

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
</style>
