import { computed, ref } from 'vue';
import { MUTATIONS } from '@/db/queries';
import todos from '@/db/db';

const useFilter = ref('all');

const useFilteredTodos = computed(() => {
  const sortedTodos = [...todos.value].sort((a, b) => {
    // Show incomplete todos first, then sort by creation date, newest to oldest
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  switch (useFilter.value) {
    case 'active':
      return sortedTodos.filter(todo => !todo.completed);
    case 'completed':
      return sortedTodos.filter(todo => todo.completed);
    default: // 'all'
      return sortedTodos;
  }
});

const useCompletedTodosCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length;
});

const useClearCompletedTodos = () => {
  todos.value = todos.value.filter(todo => !todo.completed);
  MUTATIONS.saveTodos(todos.value);
}

export { useClearCompletedTodos, useCompletedTodosCount, useFilter, useFilteredTodos }
