import paths from '@/config/paths';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFoundRoute } from './router/not-found';
import { AuthRoute } from '@/feature/auth/routes/AuthForm';


const router = createBrowserRouter([
  {
    path: paths.auth,
    element: <AuthRoute/>,
  },
  {
    path: '*', 
    element: <NotFoundRoute />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

