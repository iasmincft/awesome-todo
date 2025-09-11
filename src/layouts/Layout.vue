<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          Awesome To-Do
        </q-toolbar-title>

        <q-btn 
          v-if="!authStore.loggedIn"
          color="info" 
          icon-right="person" 
          label="Login" 
          class="absolute-right q-ma-xs"
          to="/auth"  
        />

        <q-btn 
          v-else
          color="info" 
          icon-right="person" 
          label="Logout" 
          class="absolute-right q-ma-xs"
          @click="authStore.logoutUser()"
        />


      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab 
          v-for="link in linksList" 
          :key="link.title" 
          :to="link.link" 
          :label="link.label" 
          :icon="link.icon"
          exact />
      </q-tabs>
    </q-footer>

    <q-drawer 
      v-model="leftDrawerOpen" 
      :width="250" 
      show-if-above bordered class="bg-primary">
      <q-list dark>
        <q-item-label header>
          Navigation
        </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" exact class="text-grey-4" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'src/components/EssentialLink.vue'
import { useAuthStore } from 'src/stores/auth';

const linksList = [
  {
    title: 'To-Do',
    icon: 'list',
    link: '/',
    label: 'To-Do'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings',
    label: 'Settings'
  }
]

const leftDrawerOpen = ref(false)

const authStore = useAuthStore();

</script>

<style>
@media screen and (min-width: 1009px) {
  .q-footer {
    display: none;
  }
}

.q-drawer .q-router-link--active {
  color: white !important;
}

</style>