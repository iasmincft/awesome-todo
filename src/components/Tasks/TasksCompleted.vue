<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
  >
    <div v-if="tasksStore.tasksCompleted.length">
      <q-banner 
        v-if="!settingsStore.showSingleTable" 
        class="bg-accent text-white rounded-t-md"
      >
        Tasks Completed
      </q-banner>

      <transition-group
        tag="q-list"
        separator
      >
        <TaskComponent
          v-for="task in tasksStore.tasksCompleted"
          :key="task.id"
          :task="task"
          :taskId="task.id"
          @toggle-task="tasksStore.toggleCompleted"
          @delete-task="promptToDelete"
          class="dark-letter"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script setup>

import { useTasksStore } from 'stores/tasks';
import TaskComponent from 'src/components/Tasks/Task.vue';
import { useSettingsStore } from 'stores/settings'; 

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();

const { promptToDelete } = defineProps({
  promptToDelete: Function
});
</script>

<style>
.v-move {
  transition: transform 0.5s ease;
}

.v-leave-active {
  position: absolute;
  width: 100%;
}
</style>