<template>
  <div class="row justify-end q-pa-xs"> 
    <div style="width: 300px"> 
        <q-input 
        filled 
        bottom-slots 
        v-model="searchField" 
        label="Search"
        >
        <template v-slot:append>
          <q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTasksStore } from 'stores/tasks';

const tasksStore = useTasksStore();

const searchField = computed({
  get() {
    return tasksStore.search;
  },
  set(value) {
    tasksStore.setSearch(value);
  },
});

</script>