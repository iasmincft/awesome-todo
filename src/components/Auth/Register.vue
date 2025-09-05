<template>
    <form action="">
        <div class="row q-mb-md">
            <q-banner :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
                <template v-slot:avatar>
                    <q-icon name="person" color="primary" />
                </template>
                Register to access your todos anywhere!
            </q-banner>
        </div>
        <div class="row q-mt-md">
            <q-input 
                v-model="text" 
                class="col"
                label="Label (stacked)" 
                stack-label 
                :dense="dense" 
                outlined />
        </div>
    </form>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      text: ref(''),
      ph: ref(''),
      dense: ref(false)
    }
  }
}
</script>