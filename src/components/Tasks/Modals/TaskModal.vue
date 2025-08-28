<template>
  <q-card>
    <ModalHeader @close="closeModal">{{ isEditing ? 'Edit Task' : 'Add Task' }}</ModalHeader>

    <q-card-section class="q-pa-md">
      <q-form @submit.prevent="saveTask" class="q-gutter-md" ref="formRef">
        
        <ModalTaskName v-model:name="localTask.name"></ModalTaskName>
        
        <ModalDueDate v-model:dueDate="localTask.dueDate" @open-date-picker="setDefaultDate"></ModalDueDate>

        <div class="row justify-end">
          <q-toggle
            v-model="showTimeField"
            label="Add time"
            label-left
            color="accent"
            v-if="localTask.dueDate"
          />
        </div>

        <ModalDueTime v-model:dueTime="localTask.dueTime" :show-time-field="showTimeField"></ModalDueTime>
        
        <ModalButtons 
          :is-dirty="isDirty"
        />
        
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import ModalHeader from './Shared/ModalHeader.vue';
import ModalTaskName from './Shared/ModalTaskName.vue';
import ModalDueDate from './Shared/ModalDueDate.vue';
import ModalDueTime from './Shared/ModalDueTime.vue';
import ModalButtons from './Shared/ModalButtons.vue';

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save-task']);

const $q = useQuasar();
const formRef = ref(null);
const localTask = reactive({
  name: '',
  dueDate: '',
  dueTime: '',
  completed: false,
});
const showTimeField = ref(false);
const isDirty = ref(false);

const isEditing = computed(() => !!props.task);

watch(() => props.task, (newVal) => {
  if (newVal) {
    Object.assign(localTask, newVal);
    showTimeField.value = !!newVal.dueTime;
    isDirty.value = false;
  } else {
    // Reset para uma nova tarefa
    Object.assign(localTask, {
      name: '',
      dueDate: '',
      dueTime: '',
      completed: false,
    });
    showTimeField.value = false;
  }
}, { immediate: true });

watch(localTask, (newVal, oldVal) => {
  if (props.task) {
    const originalTask = { ...props.task };
    isDirty.value = JSON.stringify(newVal) !== JSON.stringify(originalTask);
  } else {
    // Para novas tarefas, verifica se o nome foi preenchido
    isDirty.value = !!newVal.name;
  }
}, { deep: true });

function saveTask() {
  formRef.value.validate().then((success) => {
    if (success) {
      emit('save-task', { ...localTask });
      emit('close');
    } else {
      $q.notify({
        message: 'Cannot save task without a name.',
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

const closeModal = () => {
  if (isDirty.value) {
    $q.dialog({
      title: 'Discard Changes',
      message: 'You have unsaved changes. Do you want to close and lose them?',
       ok: {
      push: true,
      color: 'positive'
      },
      cancel: {
        color: 'negative',
        push: true
      },
      persistent: true,
    }).onOk(() => {
      emit('close');
    }).onCancel(() => {
      // O usuário cancelou, não faz nada
    });
  } else {
    emit('close');
  }
};

</script>

<style scoped>
</style>