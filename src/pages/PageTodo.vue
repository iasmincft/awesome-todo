<template>
  <q-page class="q-pa-md" style="padding-bottom:110px">

    <div class="row justify-end q-gutter-md">
      <SearchBar />
      <Sort />
    </div>

    <div class="relative-position">
      <NoTasks
        v-if="
      (
        (!settingsStore.showSingleTable && tasksStore.tasksToDo.length === 0) ||
        (settingsStore.showSingleTable && Object.keys(tasksStore.items).length === 0)
      ) && !tasksStore.search
    "
        message="No tasks to do yet!"
        @show-add-task="showAddTask = true">
      </NoTasks> 

      <NoTasks
        v-if="tasksStore.search && Object.keys(tasksStore.items).length > 0 && tasksStore.tasksToDo.length === 0 && tasksStore.tasksCompleted.length === 0"
        message="No tasks match your search."
        @show-add-task="showAddTask = true">
        
      </NoTasks>

      <template v-if="tasksStore.tasksToDo.length">
        <TasksToDo 
          :promptToDelete="promptToDelete"
          :promptToEdit="promptToEdit"
        />
      </template>
      
    
      <template v-if="tasksStore.tasksCompleted.length">
        <div v-if="!settingsStore.showSingleTable" >
          <hr>
        </div>
        <TasksCompleted :promptToDelete="promptToDelete" />
      </template>
    </div>

    <div class="absolute-bottom text-right q-pa-lg ">
      <q-btn @click="showAddTask = true" round dense color="primary" size="24px" icon="add" />
    </div>

    <q-dialog v-model="showAddTask">
      <AddTask @close="showAddTask = false" />
    </q-dialog>

    <q-dialog v-model="showEditTask">
      <EditTask :task="taskToEdit" @update-task="editTask" @close="showEditTask = false" />
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from 'stores/tasks';
import { useQuasar } from "quasar";
import AddTask from "src/components/Tasks/Modals/AddTask.vue";
import EditTask from "src/components/Tasks/Modals/EditTask.vue";
import TasksToDo from 'src/components/Tasks/TasksToDo.vue';
import TasksCompleted from "src/components/Tasks/TasksCompleted.vue";
import SearchBar from 'src/components/Tasks/Tools/SearchBar.vue';
import NoTasks from "src/components/Tasks/NoTasks.vue";
import Sort from "src/components/Tasks/Tools/Sort.vue";
import { useSettingsStore } from 'stores/settings';

const tasksStore = useTasksStore();
const settingsStore = useSettingsStore();
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

.rounded-t-md {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
  .q-list--bordered {
   border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>