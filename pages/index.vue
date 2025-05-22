<script setup lang="ts">
// Redirect to notes dashboard
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.push("/notes");
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>Redirecting to dashboard...</p>
  </div>
</template>