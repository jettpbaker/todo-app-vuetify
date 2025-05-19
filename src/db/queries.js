import todos from './db';

const QUERIES = {
  getTodos: () => JSON.parse(localStorage.getItem('vuetify-todos-app')),
}

const MUTATIONS = {
  saveTodos: () => localStorage.setItem('vuetify-todos-app', JSON.stringify(todos.value)),
  addTodo: todoText => {
    if (!todoText.trim()) return;
    todos.value.unshift({
      id: Date.now(),
      text: todoText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    });
    MUTATIONS.saveTodos();
  },
  toggleTodo: id => {
    const todo = todos.value.find(todo => todo.id === id);
    if (!todo) return;
    todo.completed = !todo.completed;
    MUTATIONS.saveTodos();
  },
  deleteTodo: id => {
    todos.value = todos.value.filter(todo => todo.id !== id)
    MUTATIONS.saveTodos();
  },
}

export { QUERIES, MUTATIONS };
