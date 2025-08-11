<template>
    <q-input 
        autofocus 
        :model-value="name"  
        @update:model-value="$emit('update:name', $event)"
        label="Task name" 
        filled 
        clearable
        :rules="[val => !!val || 'Field is required']"
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