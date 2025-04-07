import { fetchWrapper, type ResponseData } from '../helpers';
import type { Todo, TodoForm, TodoUpdateForm } from '../interfaces/index';

const BASE_URL = '/api/todo';

// create todo
export async function createTodo(todoForm: TodoForm): Promise<ResponseData> {
  const response = await fetchWrapper.post(
    BASE_URL,
    todoForm as unknown as Record<string, unknown>
  );
  if (!response) {
    throw new Error('Erreur lors de la création du todo: la réponse est nulle');
  }
  return response;
}

// update todo
export async function updateTodo(id: string, todoForm: TodoUpdateForm): Promise<ResponseData> {
  const response = await fetchWrapper.patch(
    `${BASE_URL}/${id}`,
    todoForm as unknown as Record<string, unknown>
  );
  if (!response) {
    throw new Error('Erreur lors de la mise à jour du todo: la réponse est nulle');
  }
  return response;
}

// delete todo
export async function deleteTodo(id: string): Promise<ResponseData> {
  const response = await fetchWrapper.delete(`${BASE_URL}/${id}`);
  if (!response) {
    throw new Error('Erreur lors de la suppression du todo: la réponse est nulle');
  }
  return response;
}

// get all todos
export async function fetchAllTodo(): Promise<Todo[] | null> {
  const response = await fetchWrapper.get(BASE_URL);
  if (!response) {
    throw new Error('Erreur lors de la récupération de tous les todos: la réponse est nulle');
  }
  return response as unknown as Todo[];
}

// search todos
export async function fetchSearchTodo(query: string): Promise<Todo[] | null> {
  const response = await fetchWrapper.get(`${BASE_URL}/search?q=${query}`);
  if (!response) {
    throw new Error('Erreur lors de la recherche des todos: la réponse est nulle');
  }
  return response as unknown as Todo[];
}
