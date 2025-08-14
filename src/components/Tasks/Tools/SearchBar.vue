<template>
  <div class="row justify-end q-pa-xs"> 
    <div style="width: 300px"> 
        <q-input 
        filled 
        bottom-slots 
        v-model="searchField" 
        label="Search" 
        :dense="dense">
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

</script>