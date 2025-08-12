<template>
    <q-list 
      v-if="tasksStore.tasksToDo.length"
      separator
      bordered>
      <TaskComponent
        v-for="task in tasksStore.tasksToDo"
        :key="task.id"
        :task="task"
        :taskId="task.id"
        @toggle-task="tasksStore.toggleCompleted"
        @delete-task="promptToDelete"
        @edit-task="promptToEdit"
      />
    </q-list>
</template>

<script setup>

</script>