<template>
    <q-card>
        <q-card-section class="row">
            <div class="text-h6 text-primary">Add Task</div>
            <q-space />
            <q-btn flat round dense color="primary" icon="close" v-close-popup />
        </q-card-section>

        <q-card-section class="q-pa-md">
            <q-form @submit.prevent="addTask" class="q-gutter-md">
                <q-input v-model="newTask.name" label="Nome da tarefa" filled clearable />
                <q-input filled v-model="newTask.dueDate" label="Data" mask="##/##/####">
                    <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale" @before-show="setDefaultDate">
                                <q-date v-model="newTask.dueDate" mask="DD/MM/YYYY">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Fechar" color="negative" flat />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input filled v-model="newTask.dueTime" label="Hora" mask="##:##">
                    <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="newTask.dueTime">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Fechar" color="negative" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>

                <q-card-actions align="right">
                    <q-btn type="submit" label="Adicionar Tarefa" color="primary" v-close-popup />
                </q-card-actions>
            </q-form>

        </q-card-section>

    </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { useTasksStore } from 'src/stores/tasks';
import { uid } from 'quasar';

const tasksStore = useTasksStore();
const newTask = ref({
    name: '',
    dueDate: '',
    dueTime: '',
    completed: false
});

function addTask() {
    if (newTask.value.name.trim()) {
        const newId = uid();
        tasksStore.items[newId] = {
            name: newTask.value.name,
            dueDate: newTask.value.dueDate,
            dueTime: newTask.value.dueTime,
            completed: false
        };

        newTask.value.name = '';
        newTask.value.dueDate = '';
        newTask.value.dueTime = '';
    }
}

function setDefaultDate() {
    // Verifica se a data já está preenchida para não sobrescrever
    if (!newTask.value.dueDate) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mês é 0-indexed
        const year = today.getFullYear();
        newTask.value.dueDate = `${day}/${month}/${year}`;
    }
}
</script>

<style></style>
