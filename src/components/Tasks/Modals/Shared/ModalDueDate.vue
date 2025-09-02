<template>
    <q-input filled :model-value="dueDate" @update:model-value="$emit('update:dueDate', $event)" label="Due Date"
        id="due-date" name="dueDate" mask="##/##/####" clearable>

        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale"
                    @before-show="$emit('open-date-picker')">

                    <q-date 
                        :model-value="dueDate" 
                        @update:model-value="$emit('update:dueDate', $event)"
                        mask="DD/MM/YYYY" 
                        color="secondary" 
                        >
                        <div class="row items-center justify-end">
                            <q-btn 
                                v-close-popup 
                                label="Fechar" 
                                color="negative" 
                                flat 
                            />
                        </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script setup>


const props = defineProps({
    dueDate: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:dueDate', 'open-date-picker']);


</script>