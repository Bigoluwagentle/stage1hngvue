<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <!-- All routed pages (Login, Signup, Dashboard, Ticket, etc.) will render here -->
  <RouterView />
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
