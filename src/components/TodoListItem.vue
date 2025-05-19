<script setup>
  defineProps({
    todo: Object,
  })

  const emit = defineEmits(['toggle-todo', 'delete-todo']);
</script>

<template>

  <v-list-item
    class="mb-3 pa-3"
    :class="{
      'bg-grey-lighten-4 text-grey-darken-3': todo.completed,
    }"
    elevation="2"
    rounded="lg"
  >
    <template #prepend>
      <v-checkbox-btn
        class="mr-3"
        :color="todo.completed ? 'grey' : 'primary'"
        :model-value="todo.completed"
        @update:model-value="emit('toggle-todo', todo.id)"
      />
    </template>

    <v-list-item-title
      class="font-weight-medium"
      :class="{
        'text-decoration-line-through': todo.completed,
      }"
      style="white-space: normal;"
    >
      {{ todo.text }}
    </v-list-item-title>
    <v-list-item-subtitle v-if="todo.createdAt" class="text-caption mt-1">
      Added: {{ new Date(todo.createdAt).toLocaleString() }}
    </v-list-item-subtitle>

    <template #append>
      <v-btn
        color="grey-darken-1"
        icon
        size="small"
        variant="text"
        @click="emit('delete-todo', todo.id)"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>
  </v-list-item>
</template>
