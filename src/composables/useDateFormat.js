import { computed } from 'vue';
import { useSettingsStore } from 'stores/settings';
import { date } from 'quasar';

export function useDateFormat() {

  const settingsStore = useSettingsStore();

  const dateFormat = computed(() => {
    if (settingsStore.showLongDate) {
      return 'DD [de] MMM [de] YYYY';
    }
    return 'DD/MM/YYYY';
  });

  
  function formatDate(dateString) {
    if (!dateString) {
      return '';
    }
    const dateObject = date.extractDate(dateString, 'DD/MM/YYYY');
    return date.formatDate(dateObject, dateFormat.value, {
      monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    });
  }

  return {
    formatDate
  };
}