import {RouteObject, redirect} from 'react-router-dom';
import {GroupsPage} from "./groups";
import {ExercisesPage} from "./exercises";

export const MainRoutes: RouteObject[] = [
    {
        path: '/',
        loader: () => redirect('/groups'),
    },
    {
        path: '/groups',
        element: <GroupsPage/>,
    },
    {
        path: '/exercises',
        element: <ExercisesPage/>,
    },
];

