<template>
  <q-page padding>
    <div style="max-width: 350px">
      <q-list bordered padding>
        
        <q-item-label header>Settings</q-item-label>
  
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show long date</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle 
              v-model="show12hFormat"  
              color="blue" 
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle 
              v-model="darkMode"  
              color="blue" 
            />
          </q-item-section>
        </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Single table</q-item-label>
        </q-item-section>
        <q-item-section side top>
          <q-toggle color="green" v-model="notif2" val="friend" />
        </q-item-section>
      </q-item>
  
        </q-list>
    </div>
  </q-page>
</template>

<script setup>
  import { computed } from 'vue';
  import { useSettingsStore } from 'stores/settings';

  const settingsStore = useSettingsStore();
  
  const showLongDate = computed({
    get() {
      return settingsStore.showLongDate;
    },
    set(value) {
      settingsStore.showLongDate(value);
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

  const showTasksInOneList = computed({
    get() {
      return settingsStore.showTasksInOneList;
    },
    set(value) {
      settingsStore.setShowTasksInOneList(value);
    }
  });
</script>

<style>
</style>