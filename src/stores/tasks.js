import { defineStore, acceptHMRUpdate } from "pinia";
import { uid } from "quasar";

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
    };
  },
  getters: {
     tasksToDo: (state) => {
      if (!state.items) return []; // Retorna um array vazio se não houver tarefas
      const tasksArray = Object.entries(state.items).map(([id, task]) => ({
        id,
        ...task,
      }));

      const sorted = tasksArray.sort((a, b) => {
        // Prioridade 1: Mover tarefas sem data para o final da lista.
        if (!a.dueDate && !b.dueDate) {
          return 0; // Se ambos não têm data, mantém a ordem original.
        }
        if (!a.dueDate) {
          return 1; // Se A não tem data, B vem primeiro.
        }
        if (!b.dueDate) {
          return -1; // Se B não tem data, A vem primeiro.
        }
  
        // Prioridade 2: Converter a data e a hora para objetos Date para comparação.
        // Se a hora estiver faltando, usamos 'T00:00' como padrão.
        const dateA = new Date(
          a.dueDate.split("/").reverse().join("-") +
            (a.dueTime ? "T" + a.dueTime : "T00:00")
        );
        const dateB = new Date(
          b.dueDate.split("/").reverse().join("-") +
            (b.dueTime ? "T" + b.dueTime : "T00:00")
        );
  
        // Comparação final
        return dateA - dateB;
      });
      return tasksArray.filter((task) => !task.completed);
    },
    // Getter corrigido para incluir o ID
    tasksCompleted: (state) => {
      if (!state.items) return []; // Retorna um array vazio se não houver tarefas
      const tasksArray = Object.entries(state.items).map(([id, task]) => ({
        id,
        ...task,
      }));
      return tasksArray.filter((task) => task.completed);
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
