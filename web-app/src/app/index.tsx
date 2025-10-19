import { AuthProvider } from '@/lib/auth';
import { AppRouter } from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
      <ReactQueryDevtools initialIsOpen={false} />
    </AuthProvider>
  );
};
