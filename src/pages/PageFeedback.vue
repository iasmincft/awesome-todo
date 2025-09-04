<template>
  <q-page class="q-pa-md">
    <div class="row items-center">
      <q-btn 
        to="/settings" 
        icon="chevron_left"
        flat 
        round
        dense
      />
      <div class="text-h6 q-ml-sm">FEEDBACK</div>
    </div>
    <div class="q-ma-md ">
      Alguma sugestão ou comentário? Adoraríamos ouvir você!
    </div>
    <div class="q-ma-md q-gutter-md" style="max-width: 600px;">
      <q-input 
        filled 
        v-model="email" 
        label="Seu e-mail" 
        type="email" 
        :rules="[val => !!val || 'Field is required']"
      />
      <q-input 
        filled 
        v-model="feedback" 
        label="Seu feedback" 
        type="textarea" 
      />
      <q-btn 
        @click="submitFeedback" 
        label="Enviar Feedback" 
        color="primary" 
        class="q-mt-md"
        :disable="!feedback && !email"
        unelevated
      />
    </div>

     <q-item
      @click="emailUs"
      v-ripple
      clickable
      tag="a"
    >
      <q-item-section avatar>
        <q-icon name="email" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Prefere nos enviar um e-mail diretamente?</q-item-label>
        <q-item-label caption>icft@awesometodo.com</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-icon name="open_in_new" />
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();


const email = ref('');
const feedback = ref('');

const submitFeedback = () => {
  // Uma validação simples para o feedback
  if (!feedback.value.trim()) {
    $q.notify({
      message: 'Por favor, escreva seu feedback antes de enviar.',
      color: 'negative',
      icon: 'warning'
    });
    return;
  }
  
  // Lógica para enviar o feedback
  console.log('Feedback enviado:', feedback.value);
  console.log('E-mail do usuário:', email.value);

  // Exibe uma notificação de sucesso e volta para a página anterior
  $q.notify({
    message: 'Obrigado pelo seu feedback!',
    color: 'positive',
    icon: 'check_circle'
  });

  router.back();
};

const emailUs = () => {
  const mailtoLink = 'mailto:icft@awesometodo.com?subject=Awesome Todo Feedback';
  // Usar window.location.href é uma forma segura de abrir o cliente de e-mail
  window.location.href = mailtoLink;
};
    
</script>

<style>
</style>