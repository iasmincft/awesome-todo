<template>
    
    
    <q-input 
        filled 
        :model-value="dueTime" 
        @update:model-value="$emit('update:dueTime', $event)" 
        label="Due Time" 
        id="due-time"
        name="dueTime"
        mask="##:##" 
        v-if="showTimeField" > 
        
        <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy 
                    cover 
                    transition-show="scale" 
                    transition-hide="scale" >
                    <q-time 
                    :model-value="dueTime" 
                    @update:model-value="$emit('update:dueTime', $event)"  
                    color="secondary">
                        <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Fechar" color="negative" flat />
                        </div>
                    </q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script setup>
const props = defineProps({
  dueTime: {
    type: String,
    default: ''
  },
  showTimeField: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:dueTime']);
</script>