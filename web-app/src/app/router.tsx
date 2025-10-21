import paths from '@/config/paths';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { NotFoundRoute } from './router/not-found';
import { AuthRoute } from '@/feature/auth/routes/AuthForm';
import { ProtectedRoute } from '@/lib/auth';

const router = createBrowserRouter([
  {
    path: paths.auth,
    element: <AuthRoute />,
  },
  {
    path: '/',
    element: <ProtectedRoute><Outlet /></ProtectedRoute>,

    children: [
      {
        index: true,
        lazy: async () => {
          const { DashboardRoute } = await import('@/feature/dashboard/routes/dashboard-route');
          return { Component: DashboardRoute };
        },
      },
      {
        path:paths.pageBuilder.getHref(),
        lazy: async () => {
          const { PageBuilder } = await import('@/feature/page-builder/routes/page-builder');
          return { Component: PageBuilder };
        },
      }
    ],
  },
  {
    path: '*',
    element: <NotFoundRoute />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
