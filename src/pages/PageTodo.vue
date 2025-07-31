<template>
  <q-page class="q-pa-md">
    <q-list 
      separator
      bordered>

      <q-item
        v-for="task in tasks"
        :key="task.id"
        @click="task.completed = !task.completed"
        :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
        clickable
        v-ripple
      >
        <q-item-section side top>
          <q-checkbox v-model="task.completed"></q-checkbox>
        </q-item-section>

        <q-item-section>
          <q-item-label :class="{'text-strikethrough': task.completed}">{{ task.name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <div class="column justify-center">
              <q-icon name="event" size="18px" class="q-mr-xs"/>
            </div>
            <div class="column">
              <q-item-label class="row justify-end" caption>{{ task.dueDate }}</q-item-label>
              <q-item-label class="row justify-end" caption><small>{{ task.dueTime }}</small></q-item-label>
            </div>
          </div>
        </q-item-section>
      </q-item>
      
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { 
          id: 1, 
          name: 'Buy groceries', 
          completed: false, 
          dueDate: '20/01/2025', 
          dueTime: '18:00' 
        },
        { 
          id: 2, 
          name: 'Walk the dog', 
          completed: false, 
          dueDate: '21/02/2025', 
          dueTime: '19:00' 
        },
        { 
          id: 3, 
          name: 'Finish project report', 
          completed: false, 
          dueDate: '22/03/2025', 
          dueTime: '20:00' 
        }
      ]
    };
  },

}
</script>

