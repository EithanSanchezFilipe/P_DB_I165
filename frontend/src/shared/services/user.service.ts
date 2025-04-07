import { fetchWrapper, type ResponseData } from '../helpers';
import type { LoginForm, User } from '../interfaces/index';

const BASE_URL = '/api/user';

// create new user
export async function createUser(userForm: LoginForm): Promise<ResponseData> {
  const response = await fetchWrapper.post(
    BASE_URL,
    userForm as unknown as Record<string, unknown>
  );
  if (!response) {
    throw new Error("Erreur lors de la création de l'utilisateur: la réponse est nulle");
  }
  return response;
}

// delete current user
export async function deleteCurrentUser(): Promise<ResponseData> {
  const response = await fetchWrapper.delete(BASE_URL);
  if (!response) {
    throw new Error("Erreur lors de la suppression de l'utilisateur: la réponse est nulle");
  }
  return response;
}

// update current user
export async function updateCurrentUser(userForm: User): Promise<ResponseData> {
  const response = await fetchWrapper.patch(
    BASE_URL,
    userForm as unknown as Record<string, unknown>
  );
  if (!response) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur: la réponse est nulle");
  }
  return response;
}

// get current user
export async function fetchCurrentUser(): Promise<User | null> {
  const response = await fetchWrapper.get(BASE_URL);
  if (!response) {
    throw new Error("Erreur lors de la récupération de l'utilisateur: la réponse est nulle");
  }
  return response as unknown as User;
}
