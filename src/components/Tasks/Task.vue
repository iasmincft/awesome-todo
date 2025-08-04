<template>
  <q-item 
    @click="task.completed = !task.completed"
    :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
    clickable
    v-ripple>
    <q-item-section side top>
      <q-checkbox v-model="task.completed" />
    </q-item-section>

    <q-item-section>
      <q-item-label
        :class="{ 'text-strikethrough' : task.completed }">
        {{ task.name }} {{ taskId }} </q-item-label>
    </q-item-section>

    <q-item-section side>
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
  </q-item>
</template>

<script setup>
  // Define as props que este componente Task.vue receberá
  const props = defineProps({
    task: {
      type: Object,
      required: true
    },
    taskId: { // Renomeado de 'id' para 'taskId' para evitar conflito com 'id' interno da task se existir
      type: String,
      required: true
    }
  });
</script>

<style scoped>
/* Adicione estilos específicos para o componente Task.vue aqui se necessário */
</style>