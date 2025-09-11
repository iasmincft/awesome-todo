<template>
  <q-page padding>
    <div>
      <q-list bordered padding>
        
        <q-item-label  header>Settings</q-item-label>
  
        <q-item tag="label" v-ripple>
          <q-item-section side>
            <q-icon name="edit_calendar" size="20px" class="q-mr-xs"  />
          </q-item-section>
          <q-item-section>
            <q-item-label>Show long date</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle 
              v-model="showLongDate"  
              color="accent" 
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section side>
            <q-icon name="dark_mode" size="20px" class="q-mr-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle 
              v-model="darkMode"  
              color="accent" 
            />
          </q-item-section>
        </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section side>
          <q-icon name="view_list" size="20px" class="q-mr-xs" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Single table</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="accent" v-model="showSingleTable" />
        </q-item-section>
      </q-item>

      <q-item-label  header>More</q-item-label>
  
        <q-item to="/settings/help" tag="label" v-ripple>
          <q-item-section side >
            <q-icon name="help" size="20px" class="q-mr-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Help</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" size="20px" class="q-mr-xs" />
          </q-item-section>
        </q-item>

        <q-item to="/settings/feedback" tag="label" v-ripple>
          <q-item-section side >
            <q-icon name="feedback" size="20px" class="q-mr-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Feedback</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="chevron_right" size="20px" class="q-mr-xs" />
          </q-item-section>
        </q-item>

        <q-item @click="visitOurWebsite" tag="label" v-ripple>
          <q-item-section side >
            <q-icon name="monitor" size="20px" class="q-mr-xs" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Visit our website</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-icon name="open_in_new" size="20px" class="q-mr-xs" />
          </q-item-section>
        </q-item>
  
        </q-list>
    </div>

    
    <div class="q-mt-xl">
      <q-btn 
        label="Exportar Meus Dados" 
        icon="archive"
        color="primary"
        @click="exportData" 
        unelevated 
      />
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue';
  import { useSettingsStore } from 'stores/settings';
  import { openURL } from 'quasar';

  const settingsStore = useSettingsStore();
  
  const showLongDate = computed({
    get() {
      return settingsStore.showLongDate;
    },
    set(value) {
      settingsStore.setShowLongDate(value);
    }
  });

  const darkMode = computed({
    get() {
      return settingsStore.darkMode;
    },
    set(value) {
      settingsStore.setDarkMode(value);
    }
  });

  const showSingleTable = computed({
    get() {
      return settingsStore.showSingleTable;
    },
    set(value) {
      settingsStore.setShowSingleTable(value);
    }
  });

  const visitOurWebsite = () => {
    openURL('https://github.com/iasmincft/awesome-todo');
  };




  function exportData() {
  // 1. Coleta todos os dados do LocalStorage em um único objeto JavaScript.
  // Usamos 'reduce' para transformar o array de chaves em um objeto de chave/valor.
  const dataToExport = Object.keys(localStorage).reduce((obj, key) => {
    try {
      // Tenta converter o valor de volta para JSON, se for o caso
      obj[key] = JSON.parse(localStorage.getItem(key));
    } catch (e) {
      // Se não for um JSON válido, apenas pega o valor como string
      obj[key] = localStorage.getItem(key);
    }
    return obj;
  }, {});

  // 2. Converte o objeto JavaScript em uma string JSON formatada (com indentação de 2 espaços).
  const jsonString = JSON.stringify(dataToExport, null, 2);

  // 3. Cria um Blob (um objeto tipo arquivo) com a string JSON.
  const blob = new Blob([jsonString], { type: "application/json" });

  // 4. Cria uma URL temporária para o Blob.
  const url = URL.createObjectURL(blob);

  // 5. Cria um elemento de link <a> invisível.
  const link = document.createElement("a");
  link.href = url;
  link.download = "awesome_todo_data.json"; // Define o nome do arquivo

  // 6. Adiciona o link ao corpo do documento e simula um clique para iniciar o download.
  document.body.appendChild(link);
  link.click();

  // 7. Limpeza: remove o link e a URL temporária da memória.
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
</script>

<style>
</style>