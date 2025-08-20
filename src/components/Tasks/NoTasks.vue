<template>

  <q-banner class="bg-grey-3">
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
  <div class="absolute-bottom q-pa-lg q-pr-xl row items-center justify-end">
      <div v-if="!tasksStore.tasksToDo.length && !tasksStore.search" class="row items-center q-mr-xl">
        <div class="text-subtitle1 text-accent q-mr-l">
          Plan something extraordinary
        </div>
        <q-icon name="keyboard_double_arrow_right" size="40px" color="accent" />
      </div>
    </div>
  </q-banner>
</template>

<script setup>

import { useTasksStore } from 'stores/tasks';

const tasksStore = useTasksStore();

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
</style>