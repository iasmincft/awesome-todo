<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettingsStore } from 'stores/settings';

const settingsStore = useSettingsStore();

onMounted(() => {
  settingsStore.setDarkMode(settingsStore.darkMode);
});
</script>

<style>
.text-strikethrough {
  text-decoration: line-through;
}
</style>