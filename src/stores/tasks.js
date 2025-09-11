import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed } from 'vue';
import { useAuthStore } from './auth';
import { db } from 'boot/firebase';
import { ref as dbRef, onValue, set, remove, update, push, off } from 'firebase/database';
import { Notify } from "quasar";

// Seu objeto de funções de ordenação continua o mesmo
const sortFunctions = {
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
  'date-asc': (a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    const dateA = new Date(`${a.dueDate.split("/").reverse().join("-")}T${a.dueTime || '00:00'}`);
    const dateB = new Date(`${b.dueDate.split("/").reverse().join("-")}T${b.dueTime || '00:00'}`);
    return dateA - dateB;
  },
  'date-desc': (a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    const dateA = new Date(`${a.dueDate.split("/").reverse().join("-")}T${a.dueTime || '00:00'}`);
    const dateB = new Date(`${b.dueDate.split("/").reverse().join("-")}T${b.dueTime || '00:00'}`);
    return dateB - dateA;
  },
};

export const useTasksStore = defineStore("tasks", () => {
  // === STATE ===
  // 'items' agora é um ref vazio, preenchido pelo Firebase.
  const items = ref({});
  const search = ref('');
  const sort = ref({ by: 'date', asc: true });
  const tasksDownloaded = ref(false);

  const authStore = useAuthStore();
  let tasksListener; // Variável para guardar nosso "ouvinte" do Firebase

  // === GETTERS (agora como 'computed') ===
  const tasksAsArray = computed(() => {
    return Object.entries(items.value).map(([id, task]) => ({ id, ...task }));
  });

  const tasksFiltered = computed(() => {
    if (!search.value) return tasksAsArray.value;
    const searchLowerCase = search.value.toLowerCase();
    return tasksAsArray.value.filter(task => 
      task.name.toLowerCase().includes(searchLowerCase)
    );
  });
  
  const tasksToDo = computed(() => {
    const tasksUncompleted = tasksFiltered.value.filter(task => !task.completed);
    const sortKey = `${sort.value.by}-${sort.value.asc ? 'asc' : 'desc'}`;
    if (sortFunctions[sortKey]) {
      tasksUncompleted.slice().sort(sortFunctions[sortKey]);
    }
    return tasksUncompleted;
  });

  const tasksCompleted = computed(() => {
    const completed = tasksFiltered.value.filter(task => task.completed);
    return completed.sort((a, b) => b.completedAt - a.completedAt); // Mais recentes primeiro
  });

  // === ACTIONS ===
  const firebaseGetTasks = () => {
    
    if (authStore.user?.uid) {
      const tasksPath = `tasks/${authStore.user.uid}`;
      const tasksRef = dbRef(db, tasksPath);
      // Ouve por mudanças em tempo real e atualiza o estado 'items'
      tasksListener = onValue(tasksRef, (snapshot) => {
        items.value = snapshot.val() || {};
        tasksDownloaded.value = true;
      }, (error) => {
        console.error("Firebase onValue error:", error);
        tasksDownloaded.value = true;
      });
    }
  };

  const firebaseStopListening = () => {
    if (tasksListener) {
      tasksListener(); // Desliga o ouvinte
      items.value = {}; // Limpa o estado
      tasksDownloaded.value = false;
    }
  };

  const addTask = (taskData) => {
    if (taskData.name.trim() && authStore.user?.uid) {
      const taskId = Date.now().toString(); // ID simples baseado em timestamp
      const taskPath = `tasks/${authStore.user.uid}/${taskId}`;
      set(dbRef(db, taskPath), {
        name: taskData.name,
        completed: false,
        dueDate: taskData.dueDate || '',
        dueTime: taskData.dueTime || ''
      });
    }
  };

  const updateTask = (updatedTask) => {
    if (authStore.user?.uid && updatedTask.id) {
      // Cria um objeto limpo para não salvar o 'id' dentro do objeto no Firebase
      const taskPayload = { ...updatedTask };
      delete taskPayload.id;
      const taskPath = `tasks/${authStore.user.uid}/${updatedTask.id}`;
      update(dbRef(db, taskPath), taskPayload);
    }
  };

  const toggleCompleted = (taskId) => {
    if (items.value[taskId] && authStore.user?.uid) {
      const taskPath = `tasks/${authStore.user.uid}/${taskId}`;
      const isCompleted = !items.value[taskId].completed;
      update(dbRef(db, taskPath), {
        completed: isCompleted,
        completedAt: isCompleted ? new Date().getTime() : null
      });
    }
  };

  const deleteTask = (taskId) => {
    if (authStore.user?.uid) {
      const taskPath = `tasks/${authStore.user.uid}/${taskId}`;
      remove(dbRef(db, taskPath));
    }
  };

  const setSearch = (value) => {
    search.value = value;
  };

  const setSort = (sortBy) => {
    if (sort.value.by === sortBy) {
      sort.value.asc = !sort.value.asc;
    } else {
      sort.value.by = sortBy;
      sort.value.asc = true;
    }
  };

  return {
    items,
    search,
    sort,
    tasksToDo,
    tasksCompleted,
    tasksDownloaded,
    firebaseGetTasks,
    firebaseStopListening,
    addTask,
    updateTask,
    toggleCompleted,
    deleteTask,
    setSearch,
    setSort
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}