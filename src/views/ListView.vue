<script setup>
import LoadingComponent from '@/components/loadingComponent.vue'
import { useNoteStore } from '@/stores/store'
import { computed } from 'vue'

const noteStore = useNoteStore()
const notes = computed(() => noteStore.notes)

const getNotes = () => {
  noteStore.getList()
}

getNotes()
</script>

<template>
  <div class="box-layout">
    <h1>Note list.</h1>
    <loading-component v-if="noteStore.isLoading"></loading-component>
    <section v-else id="note-container">
      <router-link :to="'/note/' + note.id" v-for="note in notes" :id="note.id" :key="note.id">{{
        note.subject
      }}</router-link>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@use '../assets/general.scss';
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
</style>
