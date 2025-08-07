<template>
  <q-page class="q-pa-md">
    <q-list 
      v-if="Object.keys(tasksStore.tasks).length"
      separator
      bordered>

      <TaskComponent
        v-for="task in tasksStore.sortedTasks"
        :key="task.id"
        :task="task"
        :task-id="task.id" 
        @toggle-task="tasksStore.toggleCompleted"
        @delete-task="promptToDelete"
        @edit-task="promptToEdit"
      />

      
    </q-list>
    
    <div 
    v-else
    class="absolute-center no-tasks-message column items-center">
    <q-icon name="self_improvement" size="100px" color="secondary" />
    <div class="text-h6 text-secondary q-mt-md text-center">
      No tasks yet!
    </div>
  </div>
  
  <div class="absolute-bottom q-pa-lg q-pr-xl row items-center justify-end">
    
    <div 
    v-if="!Object.keys(tasksStore.tasks).length"
    class="row items-center q-mr-xl">
    <div class="text-subtitle1 text-accent q-mr-l">
      Plan something extraordinary
    </div>
    <q-icon name="keyboard_double_arrow_right" size="40px" color="accent" />
  </div>
</div>

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

<q-dialog v-model="showEditTask">
  <EditTask :task="taskToEdit" @update-task="editTask" @close="showEditTask = false"/>
</q-dialog>


</q-page>
</template>

<script setup>
  import { ref } from 'vue';
  import { useTasksStore } from 'stores/tasks'; // Correct path to your Pinia store
  import TaskComponent from 'src/components/Tasks/Task.vue'; // Correct path to your Task.vue component
  import { useQuasar } from "quasar";
  import AddTask from "src/components/Tasks/Modals/AddTask.vue";
  import EditTask from "src/components/Tasks/Modals/EditTask.vue";

  const tasksStore = useTasksStore();
  const $q = useQuasar();
  const showAddTask = ref(false);
  const showEditTask = ref(false);
  const taskToEdit = ref({});
  

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

  const promptToEdit = (id) => {
    taskToEdit.value = { id: id, ...tasksStore.tasks[id] };
    showEditTask.value = true;
  };

  // Adicione a função 'editTask'
  const editTask = (updatedTask) => {
    tasksStore.updateTask(updatedTask);
    showEditTask.value = false;
  };
</script>

<style>
/* Adicione estilos específicos para PageTodo.vue aqui se necessário */
</style>