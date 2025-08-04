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
      />

    </q-list>
  </q-page>
</template>

<script setup>
  import { useTasksStore } from 'src/stores/tasks'; // Importa o store Pinia
  import TaskComponent from 'src/components/Tasks/Task.vue'; // Importa o novo componente Task

  const tasksStore = useTasksStore(); // Instancia o store
</script>

<style>
/* Adicione estilos específicos para PageTodo.vue aqui se necessário */
</style>