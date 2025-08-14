<template>
    <q-list 
      
      separator
      bordered>
      <TaskComponent
        v-for="task in tasksStore.tasksToDo"
        :key="task.id"
        :task="task"
        :taskId="task.id"
        @toggle-task="tasksStore.toggleCompleted"
        @delete-task="promptToDelete"
        @edit-task="promptToEdit"
      />
    </q-list>
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