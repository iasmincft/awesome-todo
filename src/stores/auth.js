import { defineStore } from 'pinia';
import { LocalStorage, Loading } from 'quasar';
import { auth as firebaseAuth } from 'boot/firebase';
import { Router } from 'src/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { handleFirebaseError } from 'src/utils/firebase-errors';
import { useTasksStore } from './tasks';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: false,
    user: null
  }),

  actions: {
    async registerUser(payload) {
      this.$q.loading.show();
      try {
        await createUserWithEmailAndPassword(firebaseAuth, payload.email, payload.password);
      } catch (error) {
        const errorMessage = handleFirebaseError(error);
        this.$q.notify({
          message: errorMessage,
          color: 'negative',
          icon: 'report_problem'
        });
      } finally {
        this.$q.loading.hide();
      }
    },

    async loginUser(payload) {
      this.$q.loading.show();
      try {
        await signInWithEmailAndPassword(firebaseAuth, payload.email, payload.password);
      } catch (error) {
        const errorMessage = handleFirebaseError(error);
        this.$q.notify({
          message: errorMessage,
          color: 'negative',
          icon: 'report_problem'
        });
      } finally {
        this.$q.loading.hide();
      }
    },

    logoutUser() {
      signOut(firebaseAuth);
    },

    handleAuthStateChange() {
      firebaseAuth.onAuthStateChanged(firebaseUser => {
        const tasksStore = useTasksStore();
        if (this.$q.loading.isActive) {
          this.$q.loading.hide();
        }
        if (firebaseUser) {
          this.loggedIn = true;
          this.user = { email: firebaseUser.email, uid: firebaseUser.uid };
          LocalStorage.set('loggedIn', true);
          Router.push('/').catch(() => {});
          tasksStore.firebaseGetTasks();
        } else {
          this.loggedIn = false;
          this.user = null;
          LocalStorage.set('loggedIn', false);
          Router.replace('/auth').catch(() => {});
          tasksStore.firebaseStopListening();
        }
      });
    }
  }
});