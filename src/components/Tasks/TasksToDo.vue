<template>
  <transition
    appear
    enter-active-class="animated zoomIn"
    leave-active-class="animated zoomOut"
    absolute-top
  >
    <div v-if="tasksStore.tasksToDo.length">
      <q-banner class="bg-secondary text-white rounded-t-md">
        Tasks To-Do
      </q-banner>

      <transition-group
        tag="q-list"
        separator
        bordered
      >
        <TaskComponent
          v-for="task in tasksStore.tasksToDo"
          :key="task.id"
          :task="task"
          :taskId="task.id"
          @toggle-task="tasksStore.toggleCompleted"
          @delete-task="promptToDelete"
          @edit-task="promptToEdit"
          class="dark-letter"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script setup>
import { useTasksStore } from 'stores/tasks';
import TaskComponent from 'src/components/Tasks/Task.vue';

const tasksStore = useTasksStore();

const { promptToDelete, promptToEdit } = defineProps({
  promptToDelete: Function,
  promptToEdit: Function
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