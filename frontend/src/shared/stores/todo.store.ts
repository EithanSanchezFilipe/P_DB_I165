import { defineStore } from 'pinia';
import type { Todo, TodoForm, TodoUpdateForm } from '../interfaces';
import { createTodo, deleteTodo, fetchAllTodo, fetchSearchTodo, updateTodo } from '../services';
import type { ResponseData } from '../helpers';

interface ResponseTodoData {
  id: number;
  date: string;
  text: string;
  completed: boolean;
  message?: string;
}

interface TodoState {
  allTodo: Todo[] | null;
  loaded: boolean | false;
}

export const useTodo = defineStore('todo', {
  state: (): TodoState => ({
    allTodo: null,
    loaded: false
  }),
  actions: {
    async createTodo(todoForm: TodoForm) {
      await createTodo(todoForm).then((response: ResponseData) => {
        const todoResponse = response as unknown as ResponseTodoData;
        // ajoute le todo dans le tableau
        if (this.allTodo) {
          this.allTodo.push(todoResponse);
          this.allTodo = this.allTodo.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        }
      });
    },
    async updateTodo(id: string, todoForm: TodoUpdateForm) {
      await updateTodo(id, todoForm).then((response: ResponseData) => {
        const todoResponse = response as unknown as ResponseTodoData;
        if (this.allTodo) {
          // mets à jour le todo dans le tableau
          this.allTodo = this.allTodo.map((todo) =>
            todo.id === todoResponse.id ? { ...todo, ...todoResponse } : todo
          );
        }
      });
    },
    async deleteTodo(id: string) {
      await deleteTodo(id).then((response: ResponseData) => {
        const todoResponse = response as unknown as ResponseTodoData;
        if (this.allTodo) {
          // supprime le todo du tableau
          this.allTodo = this.allTodo.filter((todo) => todo.id !== Number(todoResponse.id));
        }
      });
    },
    async fetchAllTodo() {
      this.allTodo = await fetchAllTodo();
      this.loaded = true;
    },
    async fetchSearchTodo(query: string) {
      this.allTodo = await fetchSearchTodo(query);
      this.loaded = true;
    }
  }
});
