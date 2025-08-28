<template>
    <q-input 
        autofocus 
        :model-value="name"  
        @update:model-value="$emit('update:name', $event)"
        label="Task name" 
        id="task-name"
        name="taskName"
        filled 
        clearable
        :rules="[val => !!val || 'Field is required']"
        ref="nameInput"
        v-select-all
    />
</template>

<script setup>
import { ref } from 'vue';
import { selectAllDirective } from 'src/directives/selectAll';

const vSelectAll = selectAllDirective;

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const nameInput = ref(null);

const emit = defineEmits(['update:name']);


</script>