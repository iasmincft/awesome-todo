<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from 'stores/settings';
import { useAuthStore } from 'stores/auth';

const authStore = useAuthStore();

const settingsStore = useSettingsStore();

onMounted(() => {
  settingsStore.setDarkMode(settingsStore.darkMode);
  authStore.handleAuthStateChange();
});

</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>