<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6 text-primary">Edit Task</div>
      <q-space />
      <q-btn flat round dense color="primary" icon="close" @click="onCloseClick" />
    </q-card-section>

    <q-card-section class="q-pa-md">
      <q-form @submit.prevent="saveTask" class="q-gutter-md">
        <q-input autofocus v-model="editedTask.name" label="Nome da tarefa" filled clearable
          :rules="[val => !!val || 'Field is required']" />
        <q-input filled v-model="editedTask.dueDate" label="Data" mask="##/##/####">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="editedTask.dueDate" mask="DD/MM/YYYY" color="secondary" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input filled v-model="editedTask.dueTime" label="Hora" mask="##:##"> 
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-time v-model="editedTask.dueTime" color="secondary" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-card-actions class="row justify-end">
          <q-btn type="submit" label="Salvar Alterações" color="primary" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-task', 'close']);
const $q = useQuasar();

// Cópia reativa da prop para evitar mutação direta
const editedTask = ref({ ...props.task });
// Variável para rastrear se houve alterações
const isDirty = ref(false); 

// Watcher profundo para atualizar o estado de 'isDirty'
watch(editedTask, (newValue, oldValue) => {
  if (JSON.stringify(newValue) !== JSON.stringify(props.task)) {
    isDirty.value = true;
  } else {
    isDirty.value = false;
  }
}, { deep: true });

// Watcher para atualizar o editedTask quando a prop 'task' mudar
watch(() => props.task, (newTask) => {
    editedTask.value = { ...newTask };
    isDirty.value = false; // Resetamos o estado ao abrir o modal com uma nova tarefa

});

function saveTask() {
    // Remove a referência de observação para evitar problemas
    const taskToSave = { ...editedTask.value };
    emit('update-task', taskToSave);
}

function onCloseClick() {
  if (isDirty.value) {
    $q.dialog({
      title: 'Descartar alterações?',
      message: 'Você fez alterações que não foram salvas. Deseja descartá-las?',
      cancel: {
        label: 'Continuar editando',
        color: 'primary',
        flat: true
      },
      ok: {
        label: 'Descartar',
        color: 'negative',
        flat: true
      },
      persistent: true
    }).onOk(() => {
        emit('close');
    }).onCancel(() => {
        // Nada acontece, o modal permanece aberto
    });
  } else {
    emit('close');
  }
}
</script>