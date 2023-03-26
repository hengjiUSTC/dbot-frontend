import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------
export const HomePage = Loadable(lazy(() => import('@/pages/HomePage')));
export const GeneratePage = Loadable(lazy(() => import('@/pages/GeneratePage')));
export const RoomPage = Loadable(lazy(() => import('@/pages/RoomPage')));
