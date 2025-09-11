<template>

  <transition-group
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <q-banner
      :key="'no-tasks-banner'" 
      class="bg-grey-3"
      absolute-top>
      <div 
      class="flex flex-center q-py-xl"
      style="min-height: 200px;">
      <div class="column items-center">
    
        <q-icon name="sentiment_dissatisfied" size="100px" color="secondary" />
        <div class="text-h6 text-secondary q-mt-md text-center">
          {{ message }}
        </div>
        <q-btn
          @click="emit('showAddTask')"
          color="accent"
          label="Add Task"
          flat
          class="q-mt-md shadow-2"
        />
      </div>
    </div>
  </q-banner>
    
  </transition-group>
</template>

<script setup>

import { useTasksStore } from 'stores/tasks';
import { useSettingsStore } from 'stores/settings';

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();

const emit = defineEmits(['showAddTask']);

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});
</script>

<style>

.shadow-2 {
  box-shadow: 0px 0px 10px var(--q-secondary);
}

body.body--dark .shadow-2 {
  box-shadow: 0px 0px 10px var(--q-secondary);
}

</style>