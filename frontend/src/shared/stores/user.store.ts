import { defineStore } from 'pinia';
import type { LoginForm, User } from '../interfaces';
import router from '@/router';
import {
  createUser,
  fetchCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
  login
} from '../services';

interface ResponseData {
  user?: User;
  token?: string; // Ensure token is explicitly defined
  message?: string;
}

interface UserState {
  currentUser: User | null;
  returnUrl: string | null;
  loaded: boolean;
  token: string;
}

export const useUser = defineStore('user', {
  state: (): UserState => ({
    currentUser: JSON.parse(localStorage.getItem('user') || '""'),
    returnUrl: null,
    loaded: false,
    token: localStorage.getItem('token') || ''
  }),
  getters: {
    isAuthenticated(state): boolean | null {
      if (state.currentUser) {
        return true;
      } else if (!state.currentUser && state.loaded) {
        return false;
      } else {
        return null;
      }
    }
  },
  actions: {
    async login({ email, password }: { email: string; password: string }): Promise<ResponseData> {
      const response: ResponseData = await login({ email, password });
      if ('user' in response && response.user) {
        this.currentUser = response.user as User;
      }
      if ('token' in response && response.token) {
        this.token = response.token;
      }

      // store user details and jwt in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      localStorage.setItem('token', this.token);

      // redirect to previous url or default to home page
      router.push(this.returnUrl || '/');

      return response; // Ensure the function returns a value
    },
    logout() {
      this.currentUser = null;
      this.token = '';
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.loaded = false;
      //router.push('/login'); // not always working, below a workaround
      window.location.href = '/';
    },
    async createUser(userForm: LoginForm) {
      if (!this.currentUser) {
        await createUser(userForm);
        this.loaded = false;
      }
    },
    async deleteUser() {
      await deleteCurrentUser().then(() => {
        this.currentUser = null;
        this.token = '';
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.loaded = false;
        router.push({ path: '/login' });
      });
    },
    async updateUser(userForm: User) {
      if (this.currentUser) {
        const response: ResponseData = await updateCurrentUser(userForm);
        if ('user' in response && response.user) {
          this.currentUser = response.user as User;
        }
        this.loaded = true;
      }
    },
    async fetchUser() {
      this.currentUser = await fetchCurrentUser();
      this.loaded = true;
    }
  },
  persist: {
    storage: sessionStorage,
    pick: ['isAuthenticated', 'currentUser']
  }
});
