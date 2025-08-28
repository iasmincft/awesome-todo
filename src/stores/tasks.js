import { defineStore, acceptHMRUpdate } from "pinia";
import { uid } from "quasar";

// Objeto auxiliar com as funções de ordenação
const sortFunctions = {
  'name-asc': (a, b) => a.name.localeCompare(b.name),
  'name-desc': (a, b) => b.name.localeCompare(a.name),
  'date-asc': (a, b) => {
    // Prioridade 1: Mover tarefas sem data para o final da lista.
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;

    // Prioridade 2: Converter data e hora para comparação.
    const dateA = new Date(`${a.dueDate.split("/").reverse().join("-")}T${a.dueTime || '00:00'}`);
    const dateB = new Date(`${b.dueDate.split("/").reverse().join("-")}T${b.dueTime || '00:00'}`);

    return dateA - dateB;
  },
  'date-desc': (a, b) => {
    // Prioridade 1: Mover tarefas sem data para o final da lista.
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    // Prioridade 2: Converter data e hora para comparação.
    const dateA = new Date(`${a.dueDate.split("/").reverse().join("-")}T${a.dueTime || '00:00'}`);
    const dateB = new Date(`${b.dueDate.split("/").reverse().join("-")}T${b.dueTime || '00:00'}`);

    return dateB - dateA;
  },
};

export const useTasksStore = defineStore("tasks", {
  state: () => {
    let tasksFromLocalStorage = null;
    try {
      tasksFromLocalStorage = JSON.parse(
        localStorage.getItem("awesome-todo-tasks")
      );
    } catch (e) {
      console.error("Erro ao carregar tarefas do localStorage:", e);
    }
    return {
      items: tasksFromLocalStorage,
      search: '',
      sort: {
        by: 'date',
        asc: true
      }
    };
  },
  getters: {
     tasksToDo: (state) => {
      if (!state.items) return []; // Retorna um array vazio se não houver tarefas
      const tasksArray = Object.entries(state.items).map(([id, task]) => ({
        id,
        ...task,
      }));

      const tasksFiltered = state.search ?
        tasksArray.filter((task) => {
          const taskNameLowerCase = task.name.toLowerCase();
          const searchLowerCase = state.search.toLowerCase();
          return taskNameLowerCase.includes(searchLowerCase);
        }) : tasksArray;

      // Cria uma cópia do array para ordenar, garantindo que o array original não seja afetado.
      const tasksUncompleted = [...tasksFiltered].filter((task) => !task.completed);

      const sortKey = `${state.sort.by}-${state.sort.asc ? 'asc' : 'desc'}`;

      // Aplica a função de ordenação selecionada
      if (sortFunctions[sortKey]) {
        tasksUncompleted.sort(sortFunctions[sortKey]);
      }

      return tasksUncompleted;
    },
    // Getter corrigido para incluir o ID
    tasksCompleted: (state) => {
      if (!state.items) return []; // Retorna um array vazio se não houver tarefas
      const tasksArray = Object.entries(state.items).map(([id, task]) => ({
        id,
        ...task,
      }));

      const tasksFiltered = state.search ?
        tasksArray.filter((task) => {
          const taskNameLowerCase = task.name.toLowerCase();
          const searchLowerCase = state.search.toLowerCase();
          return taskNameLowerCase.includes(searchLowerCase);
        }) : tasksArray;

      const completedTasks = tasksFiltered.filter((task) => task.completed);
      
      // Ordena as tarefas concluídas pelo carimbo de data/hora de conclusão
      // A tarefa mais recente (maior timestamp) vai para o final da lista.
      return completedTasks.sort((a, b) => a.completedAt - b.completedAt);
    },
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem("awesome-todo-tasks", JSON.stringify(this.items));
      console.log("Estado da store salvo no localStorage.");
    },
    // Altera o status de conclusão da tarefa
    toggleCompleted(id) {
      if (this.items[id]) {
        this.items[id].completed = !this.items[id].completed;
        // Adiciona um timestamp quando a tarefa é concluída
        if (this.items[id].completed) {
          this.items[id].completedAt = new Date().getTime();
        } else {
          // Remove o timestamp se a tarefa for reaberta
          delete this.items[id].completedAt;
        }
      } else {
        console.warn(`Task with ID ${id} not found in store.`);
      }
      this.saveToLocalStorage();
    },
    // Deleta os itens da lista
    deleteTask(id) {
      console.log("tasks.js Store: deleteTask action chamada para ID:", id);
      if (this.items[id]) {
        delete this.items[id];
        console.log(
          "tasks.js Store: Tarefa excluída. Estado atualizado:",
          this.items
        );
      } else {
        console.warn(
          `tasks.js Store: Tentativa de excluir tarefa inexistente com ID ${id}.`
        );
      }
      this.saveToLocalStorage();
    },
    // Adiciona novos itens na lista
    addTask(taskData) {
      if (taskData.name.trim()) {
        const newId = uid();
        this.items[newId] = {
          name: taskData.name,
          completed: false,
          dueDate: taskData.dueDate,
          dueTime: taskData.dueTime,
        };
        this.saveToLocalStorage();
      }
    },
    updateTask(updatedTask) {
      if (this.items[updatedTask.id]) {
        this.items[updatedTask.id] = {
          name: updatedTask.name,
          completed: updatedTask.completed,
          dueDate: updatedTask.dueDate,
          dueTime: updatedTask.dueTime,
        };
        this.saveToLocalStorage();
      } else {
        console.warn(`Task with ID ${updatedTask.id} not found.`);
      }
    },
    setSearch(value) {
      console.log('Value', value);
      this.search = value;
    },
    setSort(sortBy) {
      // Se clicou no mesmo critério, apenas inverte a direção
      if (this.sort.by === sortBy) {
        this.sort.asc = !this.sort.asc;
      } 
      // Se clicou em um novo critério, muda para ele e reseta a direção para ascendente
      else {
        this.sort.by = sortBy;
        this.sort.asc = true;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
