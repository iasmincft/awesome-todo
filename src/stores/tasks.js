import { defineStore, acceptHMRUpdate } from 'pinia'
import { uid } from 'quasar';

const initialTasks = {
      'ID1': {
        name: 'Go to shop',
        completed: false,
        dueDate: '2019/05/12',
        dueTime: '18:30'
      },
      'ID2': {
        name: 'Get bananas',
        completed: false,
        dueDate: '2019/05/13',
        dueTime: '14:00'
      },
      'ID3': {
        name: 'Get apples',
        completed: false,
        dueDate: '2019/05/14',
        dueTime: '16:00'
      }	
}

export const useTasksStore = defineStore('tasks', {
  state: () => {
    let tasksFromLocalStorage = null;
    try {
      tasksFromLocalStorage = JSON.parse(localStorage.getItem('awesome-todo-tasks'));
    } catch (e) {
      console.error("Erro ao carregar tarefas do localStorage:", e);
    }
    return {
      items: tasksFromLocalStorage || initialTasks
    };
  },
  getters: {
    tasks: (state) => {
      return state.items;
    }
    
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('awesome-todo-tasks', JSON.stringify(this.items));
      console.log('Estado da store salvo no localStorage.');
    },
    toggleCompleted(id) {
      if (this.items[id]) { 
        this.items[id].completed = !this.items[id].completed; 
      } else {
        console.warn(`Task with ID ${id} not found in store.`);
      }
    },
    deleteTask(id) {
      console.log('tasks.js Store: deleteTask action chamada para ID:', id);
      if (this.items[id]) {
        // Esta linha é a mais importante para a reatividade da exclusão
        delete this.items[id]; 
        console.log('tasks.js Store: Tarefa excluída. Estado atualizado:', this.items);
      } else {
        console.warn(`tasks.js Store: Tentativa de excluir tarefa inexistente com ID ${id}.`);
      }
    },
    addTask(taskData) {
      if (taskData.name.trim()) {
        const newId = uid();
        this.items[newId] = {
            name: taskData.name,
            completed: false,
            dueDate: taskData.dueDate,
            dueTime: taskData.dueTime
        };
        this.saveToLocalStorage();
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}