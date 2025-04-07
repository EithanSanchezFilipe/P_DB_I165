import { useUser } from '../stores';

// Guard to check if user is authenticated

export function isAuthenticatedGuard() {
  const userStore = useUser();
  if (!userStore.isAuthenticated) {
    return '/login';
  }
}

export function isNotAuthenticatedGuard() {
  const userStore = useUser();
  if (userStore.isAuthenticated) {
    return '/';
  }
}
