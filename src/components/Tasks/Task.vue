<template>
  <q-item 
    @click="toggleCompleted(taskId)"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple>
    <q-item-section side top>
      <q-checkbox :model-value="task.completed"
      @update:model-value="toggleCompleted(taskId)" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough' : task.completed }">
        {{ task.name }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="task.dueDate" side>
        <div class="row">
            <div class="column justify-center">
                <q-icon 
                    name="event"
                    size="18px"
                    class="q-mr-xs" />
            </div>
            <div class="column">
          <q-item-label 
            class="row justify-end"
            caption>
            {{ task.dueDate }}
          </q-item-label>
          <q-item-label
            class="row justify-end"
            caption>
            <small>{{ task.dueTime }}</small>
          </q-item-label>
            </div>
        </div>
    </q-item-section>

    <q-item-section side>
      <q-btn 
      @click.stop="emit('edit-task', taskId)" 
        flat 
        round 
        dense 
        color="accent" 
        icon="edit" />
    </q-item-section>

    <q-item-section side>
      <q-btn 
      @click.stop="emit('delete-task', taskId)" 
        flat 
        round 
        dense 
        color="negative" 
        icon="delete" />
    </q-item-section>
  </q-item>
</template>

<script setup>

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
  const emit = defineEmits(['toggle-task', 'delete-task']); // Declaramos o evento 'toggle-task'

  // Função para emitir o evento quando a tarefa é clicada/checkbox alterado
  const toggleCompleted = (id) => {
    emit('toggle-task', id); // Emitimos o evento com o taskId
  };
  
</script>

<style scoped>
/* Adicione estilos específicos para o componente Task.vue aqui se necessário */
</style>