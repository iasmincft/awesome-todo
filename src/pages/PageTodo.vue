<template>
  <q-page class="q-pa-md">
    <q-list 
      separator
      bordered>

      <TaskComponent
        v-for="(task, key) in tasksStore.tasks"
        :key="key"
        :task="task"
        :task-id="key" 
        @toggle-task="tasksStore.toggleCompleted"
      />

    </q-list>
  </q-page>
</template>

<script setup>
  import { useTasksStore } from 'stores/tasks'; // Correct path to your Pinia store
  import TaskComponent from 'src/components/Tasks/Task.vue'; // Correct path to your Task.vue component

  const tasksStore = useTasksStore();
</script>

<style>
/* Adicione estilos específicos para PageTodo.vue aqui se necessário */
</style>