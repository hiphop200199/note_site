<script setup>
import { useNoteStore } from '@/stores/store'
import { ref } from 'vue'
const subject = ref('')
const content = ref('')
const date = ref('')
const images = ref('')
const noteStore = useNoteStore()
const handleSubmit = ($event) => {
  $event.preventDefault()
  noteStore.add(subject.value, content.value, date.value, images.value.files)
}
</script>

<template>
  <div>
    <form @submit="handleSubmit">
      <h1>New note.</h1>
      <input type="text" v-model="subject" placeholder="subject..." />
      <textarea v-model="content" placeholder="content..."></textarea>
      <p>date.</p>
      <input type="date" v-model="date" />
      <p>{{ noteStore.message }}</p>
      <button type="submit">create</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/general.scss';
form {
  position: relative;
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
  input[type='file'] {
    position: absolute;
    visibility: hidden;
    pointer-events: none;
  }
  #upload-label {
    cursor: pointer;
    img {
      max-width: 200px;
    }
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
