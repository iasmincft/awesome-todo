<template>
  <q-item 
    @click="toggleCompleted(taskId)" 
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'" 
    v-touch-hold:1000.mouse="handleHold"
    clickable 
    v-ripple
  >
    <q-item-section side top >
      <q-checkbox :model-value="task.completed" @update:model-value="toggleCompleted(taskId)"  />
    </q-item-section>
  
    <q-item-section>
      <span 
        :class="{ 'text-strikethrough': task.completed }"
        v-html="searchHighlight"
      ></span>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
      <div class="column">
        <q-item-label class="text-right"><small>Due by:</small></q-item-label>
      <div class="row">
        <div class="column justify-center">
          <q-icon name="event" size="18px" class="q-mr-xs" />
        </div>
        <div class="column ">
          <q-item-label class="row justify-end" caption>
            {{ task.dueDate }}
          </q-item-label>
          <q-item-label class="row justify-end" caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
        </div>
      </div>
      </div>
    </q-item-section>

    <q-item-section side class="dark-letter edit-btn">
      <q-btn v-if="!task.completed" @click.stop="emit('edit-task', taskId)" flat round dense color="accent" icon="edit" />
    </q-item-section>

    <q-item-section side class="delete-btn">
      <q-btn @click.stop="emit('delete-task', taskId)" flat round dense color="negative" icon="delete" />
    </q-item-section>
  </q-item>
</template>

<script setup>

import { computed } from 'vue';
import { useTasksStore } from 'stores/tasks';

const tasksStore = useTasksStore();

// Define as props que este componente Task.vue receberá
const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  taskId: {
    type: String,
    required: true
  }
});

// Define os eventos que este componente pode emitir
const emit = defineEmits(['toggle-task', 'delete-task', 'edit-task']); // Declaramos o evento 'toggle-task'

// Função para emitir o evento quando a tarefa é clicada/checkbox alterado
const toggleCompleted = (id) => {
  emit('toggle-task', id); // Emitimos o evento com o taskId
};

const handleHold = () => {
  if (!props.task.completed) {
    emit('edit-task', props.taskId);
  }
};

const searchHighlight = computed(() => {
  const search = tasksStore.search;
  
  if (!search) {
    return props.task.name;
  }

  const regex = new RegExp(`(${search})`, 'gi');
  return props.task.name.replace(regex, '<mark>$1</mark>');
});

</script>

<style>
mark {
  background-color: var(--q-warning);
  padding: 3px;
  border-radius: 5px;
}
</style>