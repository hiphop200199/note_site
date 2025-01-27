<script setup>
import loadingComponent from '@/components/loadingComponent.vue'
import { useAuthStore, useNoteStore } from '@/stores/store'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const authStore = useAuthStore()
const noteStore = useNoteStore()
const route = useRoute()
const note = computed(() => noteStore.note)
const noteId = route.params.id
const deleteModal = ref(null)

const getNote = (id) => {
  noteStore.get(id)
}
const handleDelete = () => {
  noteStore.del(noteId)
}
const openModal = () => {
  deleteModal.value.showModal()
}
const closeModal = () => {
  deleteModal.value.close()
}
getNote(noteId)
</script>

<template>
  <loading-component v-if="noteStore.isLoading"></loading-component>
  <div v-else class="box-layout">
    <button v-if="authStore.isLogin" id="delete-btn" @click="openModal">🚮</button>
    <h1>{{ note.subject }}</h1>
    <p>
      {{ note.article }}
    </p>
    <section id="tags">
      <!-- <span class="tag">#Normal</span><span class="tag">#HTML</span><span class="tag">#Css</span> -->
    </section>
    <span>{{ note.note_date }}</span>
  </div>
  <dialog ref="deleteModal">
    <div id="box">
      <button id="close-modal" @click="closeModal">✖</button>
      <p>Delete?</p>
      <span>{{ noteStore.message }}</span>
      <section id="buttons">
        <button @click="handleDelete">Yes</button>
        <button @click="closeModal">No</button>
      </section>
    </div>
  </dialog>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
.box-layout {
  width: 80%;
  max-width: 400px;
  * {
    margin-block: 5px;
  }
  #delete-btn {
    position: absolute;
    right: 0;
    top: 0;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
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
dialog {
  width: 200px;
  height: 180px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: general.$lightColor;
  border: 3px solid general.$darkGreen;
  #box {
    display: flex;
    flex-direction: column;
    p {
      align-self: center;
      color: general.$darkGreen;
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
    }
    span {
      align-self: center;
      text-align: center;
      color: general.$darkGreen;
    }
    #close-modal {
      position: relative;
      right: 5px;
      align-self: flex-end;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: general.$darkGreen;
    }
    #buttons {
      align-self: center;
      * {
        background: general.$darkGreen;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: general.$lightColor;
        padding-inline: 8px;
        margin-inline: 3px;
      }
    }
  }
}
</style>
