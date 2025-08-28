<template>
  <div class="row justify-end q-pa-xs"> 
    <div style="width: 300px"> 
        <q-input 
        filled 
        bottom-slots 
        v-model="searchField"
        @keyup.esc="searchField = ''"
        label="Search"
        v-select-all
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
import { selectAllDirective } from 'src/directives/selectAll';

const vSelectAll = selectAllDirective;

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