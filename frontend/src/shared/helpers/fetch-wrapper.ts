import { useUser } from '../stores';

// Helper functions to perform api calls

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  body?: string;
}

interface HandleResponse {
  text(): Promise<string>;
  ok: boolean;
  status: number;
  statusText: string;
}

interface AuthStore {
  currentUser: {
    email?: string;
    password?: string;
    token?: string;
    error?: string;
    loading?: boolean;
  } | null;
  logout: () => void;
}

export interface ResponseData {
  json(): unknown;
  message?: string;
}

export const fetchWrapper = {
  get: request('GET'),
  post: request('POST'),
  put: request('PUT'),
  patch: request('PATCH'),
  delete: request('DELETE')
};

function request(
  method: string
): (url: string, body?: Record<string, unknown> | null) => Promise<ResponseData | null> {
  return async (
    url: string,
    body?: Record<string, unknown> | null
  ): Promise<ResponseData | null> => {
    const requestOptions: RequestOptions = {
      method,
      headers: authHeader(url)
    };
    if (body) {
      requestOptions.headers['Content-Type'] = 'application/json';
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
  };
}

// helper auth functions
function authHeader(url: string): Record<string, string> {
  // return auth header with jwt if user is logged in and request is to the api url
  const userStore = useUser();
  const token = userStore.token as string | null;
  const isApiUrl = url.startsWith('/api');

  if (token && isApiUrl) {
    return { Authorization: `Bearer ${token}` };
  } else {
    return { Authorization: '' };
  }
}

async function handleResponse(response: HandleResponse): Promise<ResponseData> {
  const text = await response.text();
  const data = text && JSON.parse(text);
  if (!response.ok) {
    const { currentUser, logout }: AuthStore = useUser();
    if ([401, 403].includes(response.status) && currentUser) {
      // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      logout();
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }
  return data;
}
