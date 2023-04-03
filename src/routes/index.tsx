import { baseUrl } from '@/main';
import { Navigate, useRoutes } from 'react-router-dom';
// auth
// layouts
import MainLayout from '../layouts/main';
// config
//
import { HomePage, RoomPage, GeneratePage } from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: baseUrl,
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'generate', element: <GeneratePage /> },
        { path: 'room/:id', element: <RoomPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
