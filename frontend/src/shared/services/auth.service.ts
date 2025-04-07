import type { LoginForm } from '../interfaces/index';
import { fetchWrapper, type ResponseData } from '../helpers';

const BASE_URL = '/api/auth';

// login user
export async function login(loginForm: LoginForm): Promise<ResponseData> {
  console.log('loginForm', loginForm);
  const response = await fetchWrapper.post(
    BASE_URL,
    loginForm as unknown as Record<string, unknown>
  );
  if (!response) {
    throw new Error('Pas de réponse reçue du serveur.');
  }
  return response;
}
