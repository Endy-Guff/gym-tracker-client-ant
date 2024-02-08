import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import { MainRoutes } from './routes';
import {MainLayout} from "../layouts/main";
import {RootBoundary} from "../components/error-boundary";

const router = () =>
    createBrowserRouter([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <RootBoundary />,
            children: MainRoutes,
        },
    ]);

export const AppRoutes = () => <RouterProvider router={router()} />;
