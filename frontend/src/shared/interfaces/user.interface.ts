export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  address: string;
  zip: string;
  location: string;
}

export interface LoginForm extends Partial<User> {
  password: string;
  email: string;
  confirmation?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends User {
  confirmation: string;
}

export interface ResponseData {
  user?: User;
  error?: string;
  [key: string]: unknown;
}
