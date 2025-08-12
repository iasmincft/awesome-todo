<template>
  <q-page class="q-pa-md">
    <h5 class="q-mt-sm q-mb-md">Tarefas a serem realizadas</h5>
    
      <q-list 
      v-if="tasksStore.tasksToDo.length"
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
    
    <div 
    v-else
    class="absolute-center no-tasks-message column items-center">
    <q-icon name="self_improvement" size="100px" color="secondary" />
    <div class="text-h6 text-secondary q-mt-md text-center">
      No tasks yet!
    </div>
  </div>

  <hr>

    <h5 class="q-mt-lg q-mb-md">Tarefas completas</h5>
    <q-list 
      v-if="tasksStore.tasksCompleted.length"
      separator
      bordered>
      <TaskComponent
        v-for="task in tasksStore.tasksCompleted"
        :key="task.id"
        :task="task"
        :taskId="task.id"
        @toggle-task="tasksStore.toggleCompleted"
        @delete-task="promptToDelete"
        @edit-task="promptToEdit"
      />
    </q-list>
  
  <div class="absolute-bottom q-pa-lg q-pr-xl row items-center justify-end">
    <div 
    v-if="!tasksStore.tasksToDo.length"
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
  <AddTask @close="showAddTask = false"/>
</q-dialog>

<q-dialog v-model="showEditTask">
  <EditTask :task="taskToEdit" @update-task="editTask" @close="showEditTask = false"/>
</q-dialog>

</q-page>
</template>

<script setup>
  import { ref } from 'vue';
  import { useTasksStore } from 'stores/tasks'; 
  import TaskComponent from 'src/components/Tasks/Task.vue'; 
  import { useQuasar } from "quasar";
  import AddTask from "src/components/Tasks/Modals/AddTask.vue";
  import EditTask from "src/components/Tasks/Modals/EditTask.vue";
  import TasksToDo from 'src/components/Tasks/TasksToDo.vue';

  const tasksStore = useTasksStore();
  const $q = useQuasar();
  const showAddTask = ref(false);
  const showEditTask = ref(false);
  const taskToEdit = ref({});
  
  const promptToDelete = (id) => {
    $q.dialog({
      title: 'Confirm Remove',
      message: 'Are you sure you want to delete this task?',
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
      tasksStore.deleteTask(id); 
      $q.notify({
        message: 'Task deleted!',
        color: 'positive',
        icon: 'check'
      });
    }).onCancel(() => {
      $q.notify({
        message: 'Exclusion cancelled.',
        color: 'info',
        icon: 'cancel'
      });
    });
  };

  const promptToEdit = (id) => {
    taskToEdit.value = { id: id, ...tasksStore.items[id] };
    showEditTask.value = true;
  };

  const editTask = (updatedTask) => {
    tasksStore.updateTask(updatedTask);
    showEditTask.value = false;
  };
</script>

<style>
</style>