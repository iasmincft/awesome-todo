<template>
    <q-input 
        autofocus 
        :model-value="name"  
        @update:model-value="$emit('update:name', $event)"
        label="Nome da tarefa" 
        filled 
        clearable
        :rules="[val => !!val || 'Campo obrigatório']"
        ref="nameInput"
    />
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    }
});

const nameInput = ref(null);

const emit = defineEmits(['update:name']);


</script>