<template>
  <q-form @submit.prevent="submitForm" ref="form">
    <div class="row q-mb-md">
      <q-banner rounded class="col" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'">
        <template v-slot:avatar>
          <q-icon name="person" color="primary" />
        </template>
        {{ toggleBannerLabel }}
      </q-banner>
    </div>
    <div class="row q-mt-md">
      <q-input v-model="formData.email" class="col" label="Email" stack-label outlined lazy-rules :rules="[
        val => !!val || 'Email is required',
        val => /.+@.+\..+/.test(val) || 'Please enter a valid email address.'
      ]" />
    </div>
    <div class="row q-mt-md">
      <q-input class="col" v-model="formData.password" label="Password" type="password" stack-label outlined lazy-rules
        :rules="[
          val => !!val || 'Password is required',
          val => val.length >= 6 || 'Please enter at least 6 characters.'
        ]" />
    </div>
    <div class="row">
      <q-space />
      <q-btn type="submit" :label="buttonLabel" color="primary" class="q-mt-md" />
    </div>
  </q-form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from 'src/stores/auth';

const props = defineProps({
  tab: {
    type: String,
    required: true
  }
});

const formData = reactive({
  email: '',
  password: ''
});

const form = ref(null);

const buttonLabel = computed(() => {
  return props.tab.charAt(0).toUpperCase() + props.tab.slice(1);
});

const toggleBannerLabel = computed(() => {
  return props.tab === 'login' ? 'Log in your account!' : 'Register your account!';
});

const authStore = useAuthStore();

const submitForm = async () => {
  const success = await form.value.validate();
  if (success) {
    if (props.tab === 'login') {
      await authStore.loginUser(formData);
    } else {
      await authStore.registerUser(formData);
    }
  }
}

</script>