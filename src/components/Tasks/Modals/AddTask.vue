<template>
    <q-card>
        
        <ModalHeader>Add Task</ModalHeader>

        <q-card-section class="q-pa-md">
            <q-form 
                @submit.prevent="saveTask" 
                class="q-gutter-md"
                ref="formRef">

                <ModalTaskName v-model:name="newTask.name"></ModalTaskName>
                
                <ModalDueDate v-model:dueDate="newTask.dueDate" 
                    @open-date-picker="setDefaultDate"></ModalDueDate>

                <div class="row justify-end" >
                    <q-toggle 
                        v-model="showTimeField"
                        label="Add time" 
                        label-left 
                        color="accent" 
                        v-if="newTask.dueDate" />
                </div>

                <ModalDueTime v-model:dueTime="newTask.dueTime" :show-time-field="showTimeField" ></ModalDueTime>

                <ModalButtons></ModalButtons>
                
            </q-form>

        </q-card-section>

    </q-card>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import { useQuasar } from 'quasar';

import ModalHeader from './Shared/ModalHeader.vue';
import ModalTaskName from "./Shared/ModalTaskName.vue";
import ModalDueDate from './Shared/ModalDueDate.vue';
import ModalDueTime from './Shared/ModalDueTime.vue';
import ModalButtons from './Shared/ModalButtons.vue';

const $q = useQuasar();
const tasksStore = useTasksStore();
const showTimeField = ref(false);
const formRef = ref(null);
const emit = defineEmits(['close']);

const newTask = ref({
    name: '',
    dueDate: '',
    dueTime: '',
    completed: false
});

function saveTask() {
    formRef.value.validate().then(success => {
        if (success) {
            tasksStore.addTask(newTask.value);
            resetForm();
            emit('close');
        } else {
            $q.notify({
                message: 'Não é possível salvar a tarefa sem um nome.',
                color: 'negative',
                icon: 'warning'
            });
        }
    });
}

function resetForm() {
    newTask.value.name = '';
    newTask.value.dueDate = '';
    newTask.value.dueTime = '';
    showTimeField.value = false;
}

function setDefaultDate() {
    if (!newTask.value.dueDate) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        newTask.value.dueDate = `${day}/${month}/${year}`;
    }
}

watch(() => newTask.value.dueDate, (newVal) => {
    if (!newVal) {
        newTask.value.dueTime = '';
        showTimeField.value = false;
    }
});

</script>

<style></style>
