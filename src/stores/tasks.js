import { defineStore, acceptHMRUpdate } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    items: {
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
  }),
  getters: {
    tasks: (state) => {
      return state.items;
    }
    
  },
  actions: {
    toggleCompleted(id) {
      const task = this.items.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed; 
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot))
}