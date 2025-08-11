<template>
  <q-card>
    <ModalHeader>Edit Task</ModalHeader>

    <q-card-section class="q-pa-md">
      <q-form @submit.prevent="updateTask" class="q-gutter-md">
        
        <ModalTaskName v-model:name="localTask.name"></ModalTaskName>
        
        <ModalDueDate v-model:dueDate="localTask.dueDate" 
            @open-date-picker="setDefaultDate"></ModalDueDate>

        <ModalDueTime v-model:dueTime="localTask.dueTime" :show-time-field="showTimeField" ></ModalDueTime>

        <div class="row justify-end">
          <q-toggle
            v-model="showTimeField"
            label="Add time"
            label-left
            color="accent"
            v-if="localTask.dueDate"
          />
        </div>

        <ModalButtons @close="$emit('close')" :is-dirty="isDirty"></ModalButtons>

      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { useQuasar } from 'quasar';

import ModalHeader from './Shared/ModalHeader.vue';
import ModalTaskName from "./Shared/ModalTaskName.vue";
import ModalDueDate from './Shared/ModalDueDate.vue';
import ModalDueTime from './Shared/ModalDueTime.vue';
import ModalButtons from './Shared/ModalButtons.vue';

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update-task', 'close']);
const $q = useQuasar();

const formRef = ref(null);
const localTask = reactive({
  name: '',
  dueDate: '',
  dueTime: '',
  completed: false,
});
const showTimeField = ref(!!props.task?.dueTime);
const isDirty = ref(false);

watch(() => props.task, (newVal) => {
  if (newVal) {
    Object.assign(localTask, newVal);
    showTimeField.value = !!newVal.dueTime;
    isDirty.value = false;
  }
}, { immediate: true });

watch(localTask, (newVal, oldVal) => {
  if (props.task) {
    const originalTask = { ...props.task };
    isDirty.value = JSON.stringify(newVal) !== JSON.stringify(originalTask);
  }
}, { deep: true });

function updateTask() {
  formRef.value.validate().then((success) => {
    if (success) {
      emit('update-task', { ...localTask });
      emit('close');
    } else {
      $q.notify({
        message: 'Não é possível salvar a tarefa sem um nome.',
        color: 'negative',
        icon: 'warning',
      });
    }
  });
}

function setDefaultDate() {
  if (!localTask.dueDate) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    localTask.dueDate = `${day}/${month}/${year}`;
  }
}

watch(
  () => localTask.dueDate,
  (newVal) => {
    if (!newVal) {
      localTask.dueTime = '';
      showTimeField.value = false;
    }
  }
);
</script>