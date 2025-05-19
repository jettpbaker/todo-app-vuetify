<script setup>
  import { useTodos } from '@/composables/todos';
  import { MUTATIONS } from '@/db/queries';
  import TodoListItem from '@/components/TodoListItem.vue';
  import TodoListCardHeader from '@/components/TodoListCardHeader.vue';
  import NoMatchingTodos from '@/components/alerts/NoMatchingTodos.vue';

  const { filter, filteredTodos } = useTodos();

  const handleUpdateFilter = newFilter => {
    filter.value = newFilter;
  };
</script>

<template>
  <v-card
    class="mx-auto pa-5"
    elevation="4"
    max-width="700"
    rounded="lg"
  >
    <TodoListCardHeader
      :filter="filter"
      @update-filter="handleUpdateFilter"
    />

    <v-divider class="mb-4" />

    <div v-if="filteredTodos.length > 0">
      <transition-group name="todo-list" tag="div">
        <TodoListItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @delete-todo="MUTATIONS.deleteTodo"
          @toggle-todo="MUTATIONS.toggleTodo"
        />
      </transition-group>
    </div>
    <NoMatchingTodos v-else />
  </v-card>
</template>

<style scoped>
/* Basic transition for todo list items */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.25s ease;
}
.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.todo-list-move { /* Ensures smooth reordering */
  transition: transform 0.25s ease;
}
</style>
