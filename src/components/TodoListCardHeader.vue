<script setup>
  import { useTodos } from '@/composables/todos';

  defineProps({
    filter: {
      type: String,
      default: 'all',
    },
  });

  const emit = defineEmits(['update-filter']);

  const { clearCompletedTodos, completedTodosCount, filteredTodos } = useTodos();
</script>

<template>
  <v-card-title class="text-h6 mb-1 d-flex align-center">
    <v-icon color="deep-purple-accent-4" start>mdi-format-list-checks</v-icon>
    Your Tasks
    <v-spacer />
    <span class="text-caption grey--text">
      {{ filteredTodos.length }}
      {{ filter === 'all' ? 'total' : filter }}
    </span>
  </v-card-title>

  <v-card-text class="py-0">
    <v-row align="center" class="my-2" justify="space-between">
      <v-col cols="12" sm="auto">
        <v-chip-group
          mandatory
          :model-value="filter"
          selected-class="text-deep-purple-accent-4 font-weight-bold"
        >
          <v-chip
            filter
            size="small"
            value="all"
            variant="outlined"
            @click="emit('update-filter', 'all')"
          >All</v-chip>
          <v-chip
            filter
            size="small"
            value="active"
            variant="outlined"
            @click="emit('update-filter', 'active')"
          >Active</v-chip>
          <v-chip
            filter
            size="small"
            value="completed"
            variant="outlined"
            @click="emit('update-filter', 'completed')"
          >Completed</v-chip>
        </v-chip-group>
      </v-col>
      <v-col v-if="completedTodosCount > 0" class="text-right" cols="12" sm="auto">
        <v-btn
          color="error"
          size="small"
          variant="text"
          @click="clearCompletedTodos"
        >
          Clear {{ completedTodosCount }} Completed
          <v-icon end>mdi-delete-sweep-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card-text>
</template>
