<template>
  
    <TaskModal @close="$emit('close')" @save-task="addTask"></TaskModal>
  
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import TaskModal from './TaskModal.vue';

const tasksStore = useTasksStore();
const dialogVisible = ref(false);
const emit = defineEmits(['close']);

function addTask(task) {
  tasksStore.addTask(task);
  emit('close');
}

const open = () => {
  dialogVisible.value = true;
};

defineExpose({ open });
</script>