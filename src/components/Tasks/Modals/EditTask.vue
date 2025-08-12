<template>
    <TaskModal :task="taskToEdit" @close="$emit('close')" @save-task="updateTask"></TaskModal>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import TaskModal from './TaskModal.vue';

const tasksStore = useTasksStore();
const dialogVisible = ref(false);
const taskToEdit = ref(null);
const emit = defineEmits(['close']);


function updateTask(task) {
  tasksStore.updateTask(task);
  emit('close');
}

const open = (task) => {
  taskToEdit.value = task;
  dialogVisible.value = true;
};

defineExpose({ open });
</script>