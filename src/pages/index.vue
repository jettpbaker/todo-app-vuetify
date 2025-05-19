<script setup>
  import { onMounted, ref } from 'vue';
  import { MUTATIONS, QUERIES } from '@/db/queries';
  import { useClearCompletedTodos, useCompletedTodosCount, useFilter, useFilteredTodos } from '@/composables/todos'
  import todos from '@/db/db';
  import Header from '@/components/Header.vue';
  import NoTodosAlert from '@/components/alerts/NoTodos.vue';
  import NoMatchingTodos from '@/components/alerts/NoMatchingTodos.vue';

  const newTodoText = ref('');

  const snackbar = ref({
    show: false,
    text: '',
    color: 'info',
    icon: 'mdi-information',
    timeout: 3000,
    actionColor: 'white',
  });

  onMounted(() => {
    const storedTodos = QUERIES.getTodos();
    if (storedTodos) {
      todos.value = storedTodos;
    }
  });

  const showSnackbar = (text, color = 'info', icon = 'mdi-information', timeout = 3000) => {
    snackbar.value = { show: true, text, color, icon, timeout, actionColor: color === 'warning' ? 'black' : 'white' };
  };

  const addTodo = () => {
    MUTATIONS.addTodo(newTodoText.value);
    newTodoText.value = '';
    showSnackbar('Todo added successfully!', 'success', 'mdi-check-circle');
  }

  const deleteTodo = id => {
    MUTATIONS.deleteTodo(id)
    showSnackbar('Todo deleted!', 'warning', 'mdi-delete-forever', 4000);
  }

  const toggleTodo = id => {
    // todo.completed is already updated by v-model, so we just update local storage
    MUTATIONS.saveTodos(id);
  }
</script>


<template>
  <v-app>
    <Header />

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <!-- Input Card -->
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

        <!-- Todo List Card -->
        <v-card
          v-if="todos.length > 0"
          class="mx-auto pa-5"
          elevation="4"
          max-width="700"
          rounded="lg"
        >
          <v-card-title class="text-h6 mb-1 d-flex align-center">
            <v-icon color="deep-purple-accent-4" start>mdi-format-list-checks</v-icon>
            Your Tasks
            <v-spacer />
            <span class="text-caption grey--text">
              {{ useFilteredTodos.length }}
              {{ useFilter === 'all' ? 'total' : useFilter }}
            </span>
          </v-card-title>

          <v-row align="center" class="my-2" justify="space-between">
            <v-col cols="12" sm="auto">
              <v-chip-group
                v-model="useFilter"
                mandatory
                selected-class="text-deep-purple-accent-4 font-weight-bold"
              >
                <v-chip filter size="small" value="all" variant="outlined">All</v-chip>
                <v-chip filter size="small" value="active" variant="outlined">Active</v-chip>
                <v-chip filter size="small" value="completed" variant="outlined">Completed</v-chip>
              </v-chip-group>
            </v-col>
            <v-col v-if="useCompletedTodosCount > 0" class="text-right" cols="12" sm="auto">
              <v-btn
                color="error"
                size="small"
                variant="text"
                @click="useClearCompletedTodos"
              >
                Clear {{ useCompletedTodosCount }} Completed
                <v-icon end>mdi-delete-sweep-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="mb-4" />

          <div v-if="useFilteredTodos.length > 0">
            <transition-group name="todo-list" tag="div">
              <v-list-item
                v-for="todo in useFilteredTodos"
                :key="todo.id"
                class="mb-3 pa-3"
                :class="{
                  'bg-grey-lighten-4 text-medium-emphasis': todo.completed,
                }"
                elevation="2"
                rounded="lg"
              >
                <template #prepend>
                  <v-checkbox-btn
                    v-model="todo.completed"
                    class="mr-3"
                    :color="todo.completed ? 'grey' : 'primary'"
                    @change="toggleTodo(todo.id)"
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
                    @click="deleteTodo(todo.id)"
                  >
                    <v-icon>mdi-delete-outline</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </transition-group>
          </div>
          <NoMatchingTodos v-else />
        </v-card>
        <!-- Empty State for No Todos -->
        <NoTodosAlert v-else />
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      location="top right"
      rounded="lg"
      :timeout="snackbar.timeout"
      variant="elevated"
    >
      <v-icon start>{{ snackbar.icon }}</v-icon>
      {{ snackbar.text }}
      <template #actions>
        <v-btn :color="snackbar.actionColor || 'white'" variant="text" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>


<style>
/* Basic transition for todo list items */
.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.4s ease;
}
.todo-list-enter-from,
.todo-list-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.todo-list-move { /* Ensures smooth reordering */
  transition: transform 0.4s ease;
}

/* Optional: global scrollbar styling for a more modern look */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
