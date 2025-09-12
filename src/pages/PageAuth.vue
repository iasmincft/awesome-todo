<template>

  <q-page class="q-pa-lg">
      <div class="column  q-mb-md">
        <div class="items-center justify-center text-center q-mb-md">
          <q-img 
            src="/icons/ladybugstickersecondary.png" 
            class="q-mb-md" 
            alt="Awesome ToDo Logo"
            style="width: 150px; height: 150px;"
          />
          <div class="text-h5">Welcome to Awesome Todo</div>
          <p class="text-subtitle2 text-grey-7 q-ma-none">Keep track of your tasks anywhere.</p>
        </div>
        <div class="row items-center q-gutter-x-sm">
          <q-space />
          <span class="text-grey-8">{{ toggleMessage }}</span>
          <q-btn 
            :label="toggleButtonLabel"
            @click="tab = (tab === 'login' ? 'register' : 'login')"
            color="secondary"
            dense
            padding="5px 12px"
          />
        </div>
      </div>
    
    <q-card class="auth-tabs q-pa-md" flat bordered>
      <q-tabs v-model="tab" dense class="text-grey text-justify" active-color="secondary" indicator-color="secondary"
        narrow-indicator>
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <LoginRegister :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <LoginRegister :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import LoginRegister from 'src/components/Auth/LoginRegister.vue';
const tab = ref('login');

const toggleMessage = computed(() => {
  return tab.value === 'login' ? 'Not a member?' : 'Already a member!';
});

const toggleButtonLabel = computed(() => {
  return tab.value === 'login' ? 'Register' : 'Login';
});

</script>

<style>
.auth-tabs {
  max-width: 500px;
  margin: 0 auto;
}
</style>
