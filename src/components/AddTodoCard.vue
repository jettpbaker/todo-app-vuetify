<script setup>
  import { ref } from 'vue';
  import { MUTATIONS } from '@/db/queries';

  const newTodoText = ref('');

  const addTodo = () => {
    MUTATIONS.addTodo(newTodoText.value);
    newTodoText.value = '';
  }

</script>

<template>
  <v-card
    class="mx-auto pa-5 mb-8"
    elevation="4"
    max-width="700"
    rounded="lg"
  >
    <v-card-title class="text-h5 text-center mb-4 text-deep-purple-accent-4">
      What's on your mind?
    </v-card-title>
    <v-form @submit.prevent="addTodo">
      <v-text-field
        v-model="newTodoText"
        clearable
        color="deep-purple-accent-4"
        density="comfortable"
        label="e.g., Learn Vuetify 3"
        prepend-inner-icon="mdi-pencil-plus-outline"
        variant="outlined"
      />
      <v-btn
        block
        class="mt-2"
        color="success"
        :disabled="!newTodoText.trim()"
        size="large"
        type="submit"
        variant="elevated"
      >
        <v-icon start>mdi-plus-circle</v-icon>
        Add Todo
      </v-btn>
    </v-form>
  </v-card>
</template>
