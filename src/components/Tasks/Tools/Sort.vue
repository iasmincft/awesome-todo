<template>
  <div style="width: 150px">
    <q-select  
      outlined
      label="Sort by"
      :model-value="displayValueWithIcon.label" 
      :options="sortOptions"
      @update:model-value="handleSelect"
      emit-value
      map-options
      class="q-pb-sm"
    >
      <template v-slot:selected-item>
        <div class="row items-center no-wrap full-width">
          <div class="col ellipsis">{{ displayValueWithIcon.label }}</div>
          <div class="col-auto">
            <q-icon 
              :name="displayValueWithIcon.icon" 
              class="q-ml-sm" 
              color="primary" 
            />
          </div>
        </div>
      </template>

      <template v-slot:option="scope">
        <q-item v-bind="scope.itemProps">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon 
              v-if="scope.opt.value === tasksStore.sort.by" 
              :name="tasksStore.sort.asc ? 'arrow_upward' : 'arrow_downward'" 
            />
          </q-item-section>
        </q-item>
      </template>

    </q-select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTasksStore } from 'stores/tasks';

const tasksStore = useTasksStore();

// Opções estáticas para o select. A lógica de clique será tratada separadamente.
const sortOptions = [
  { 
    label: 'Name', 
    value: 'name' 
  },
  { 
    label: 'Date', 
    value: 'date' 
  },
];

// Função que é chamada quando o usuário clica em uma opção
function handleSelect(value) {
  tasksStore.setSort(value);
}

// Computed property para mostrar o label e o ícone corretos
// no campo do select (quando está fechado).
const displayValueWithIcon = computed(() => {
  const currentSortBy = tasksStore.sort.by; // 'name' or 'date'
  const isAsc = tasksStore.sort.asc;       // true or false

  const label = currentSortBy === 'name' ? 'Name' : 'Date';
  const icon = isAsc ? 'arrow_upward_alt' : 'arrow_downward_alt';

  return { label, icon };
});

</script>

<style scoped>
.q-select {
  /* Garante que o conteúdo não quebre a linha */
  flex: 0 0 112px;
}
</style>