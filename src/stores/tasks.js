import { defineStore, acceptHMRUpdate } from 'pinia'
import { uid } from 'quasar';

const initialTasks = {
  /*
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
        */
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
    },
    // Novo getter para retornar as tarefas ordenadas
    sortedTasks: (state) => {
      const tasksArray = Object.entries(state.items).map(([id, task]) => ({ id, ...task }));
      
      return tasksArray.sort((a, b) => {
        const hasDueDateA = !!a.dueDate && !!a.dueTime;
        const hasDueDateB = !!b.dueDate && !!b.dueTime;

        // Se ambos não têm data/hora, não os move
        if (!hasDueDateA && !hasDueDateB) {
          return 0;
        }

        // Se apenas B tem data/hora, B vem primeiro
        if (!hasDueDateA) {
          return 1;
        }
        
        // Se apenas A tem data/hora, A vem primeiro
        if (!hasDueDateB) {
          return -1;
        }

        // Se ambos têm data/hora, compare-os
        const dateA = new Date(a.dueDate.split('/').reverse().join('-') + 'T' + a.dueTime);
        const dateB = new Date(b.dueDate.split('/').reverse().join('-') + 'T' + b.dueTime);

        return dateA - dateB;
      });
    }
  },
  actions: {
    saveToLocalStorage() {
      localStorage.setItem('awesome-todo-tasks', JSON.stringify(this.items));
      console.log('Estado da store salvo no localStorage.');
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
      console.log('tasks.js Store: deleteTask action chamada para ID:', id);
      if (this.items[id]) {
        delete this.items[id]; 
        console.log('tasks.js Store: Tarefa excluída. Estado atualizado:', this.items);
      } else {
        console.warn(`tasks.js Store: Tentativa de excluir tarefa inexistente com ID ${id}.`);
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