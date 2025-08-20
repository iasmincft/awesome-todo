<template>

    <q-banner class="bg-accent text-white rounded-t-md"  >
        Tasks Completed
    </q-banner>

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
        />
    </q-list>
</template>

<script setup>
import { useTasksStore } from 'stores/tasks';
import TaskComponent from 'src/components/Tasks/Task.vue';

const tasksStore = useTasksStore();

const { promptToDelete, } = defineProps({
  promptToDelete: Function
});
</script>