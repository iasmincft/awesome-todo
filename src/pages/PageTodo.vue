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
        @delete-task="promptToDelete"
      />

    </q-list>

    <div class="absolute-bottom text-right q-pa-lg ">
      <q-btn
      @click="showAddTask = true"
        round
        dense
        color="primary"
        size="24px"
        icon="add"
      />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask/>
    </q-dialog>
    
  </q-page>
</template>

<script setup>
  import { ref } from 'vue';
  import { useTasksStore } from 'stores/tasks'; // Correct path to your Pinia store
  import TaskComponent from 'src/components/Tasks/Task.vue'; // Correct path to your Task.vue component
  import { useQuasar } from "quasar";
  import AddTask from "src/components/Tasks/Modals/AddTask.vue";

  const tasksStore = useTasksStore();
  const $q = useQuasar();
  const showAddTask = ref(true);

  const promptToDelete = (id) => {
    $q.dialog({
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja excluir esta tarefa?',
      ok: {
        push: true,
        color: 'positive'
      },
      cancel: {
        color: 'negative',
        push: true
      },
      persistent: true
    }).onOk(() => {
      tasksStore.deleteTask(id); // Chama a ação Pinia APÓS a confirmação
      $q.notify({
        message: 'Tarefa excluída!',
        color: 'positive',
        icon: 'check'
      });
    }).onCancel(() => {
      // Opcional: Ação ao cancelar
      $q.notify({
        message: 'Exclusão cancelada.',
        color: 'info',
        icon: 'cancel'
      });
    });
  };
</script>

<style>
/* Adicione estilos específicos para PageTodo.vue aqui se necessário */
</style>