<script setup>
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

</script>

<template>
  <v-app-bar app color="deep-purple-accent-4" elevation="2">
    <!-- The v-if="false" means this icon will not be visible; it is a placeholder for a navigation drawer if needed -->
    <v-app-bar-nav-icon v-if="false" variant="text" />
    <v-toolbar-title class="font-weight-bold">
      <v-icon start>mdi-check-circle-outline</v-icon>
      Vuetify 3 Todo
    </v-toolbar-title>

    <v-btn icon="mdi-calendar-today" />
    <v-btn icon="mdi-account-circle" />

    <v-chip class="mr-4" color="white" pill text-color="deep-purple-accent-4">
      <v-icon start>mdi-calendar-today</v-icon>
      {{ currentDate }}
    </v-chip>
  </v-app-bar>
</template>
