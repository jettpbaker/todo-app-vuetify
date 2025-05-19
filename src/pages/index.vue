<script setup>
  import { onMounted } from 'vue';
  import { QUERIES } from '@/db/queries';
  import todos from '@/db/db';
  import Header from '@/components/Header.vue';
  import NoTodosAlert from '@/components/alerts/NoTodos.vue';
  import AddTodoCard from '@/components/AddTodoCard.vue';
  import TodoListCard from '@/components/TodoListCard.vue';

  onMounted(() => {
    const storedTodos = QUERIES.getTodos();
    if (storedTodos) {
      todos.value = storedTodos;
    }
  });

</script>


<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <AddTodoCard />

        <TodoListCard v-if="todos.length > 0" />
        <NoTodosAlert v-else />
      </v-container>
    </v-main>
  </v-app>
</template>
