<template>  
    <q-page class="q-pa-xl">
        <q-card class="auth-tabs q-pa-md" flat bordered>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey text-justify"
          active-color="secondary"
          indicator-color="secondary"
          narrow-indicator
        >
          <q-tab name="login" label="Log-in" />
          <q-tab name="register" label="Register" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="login">
            <div class="text-h6">Log-in</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="register">
            <Register/>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

    </q-page>
</template>

<script setup>
import { ref } from 'vue'
import Register from 'src/components/Auth/Register.vue'


    const tab = ref('login');
</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}

</style>
