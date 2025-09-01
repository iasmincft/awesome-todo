import { defineStore, acceptHMRUpdate } from "pinia";
import { LocalStorage, Dark } from 'quasar';

function loadSettings() {
  const settings = LocalStorage.getItem("awesome-todo-settings");

  const defaults = {
    showLongDate: false,
    showTasksInOneList: false,
    darkMode: false,
  };

  if (settings) {
    return Object.assign(defaults, settings);
  }
  return defaults;
}

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    settings: loadSettings(),
  }),

  getters: {
    showLongDate: (state) => state.settings.showLongDate,
    showTasksInOneList: (state) => state.settings.showTasksInOneList,
    darkMode: (state) => state.settings.darkMode,
  },

  actions: {
    saveSettings() {
      LocalStorage.set("awesome-todo-settings", this.settings);
    },
    showLongDate(value) {
      this.settings.showLongDate = value;
      this.saveSettings();
    },
    setShowTasksInOneList(value) {
      this.settings.showTasksInOneList = value;
      this.saveSettings();
    },
    setDarkMode(value) {
      this.settings.darkMode = value;
      this.saveSettings();
      Dark.set(value);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSettingsStore, import.meta.hot));
}