import {RouteObject, redirect} from 'react-router-dom';
import {GroupsPage} from "./groups";

export const MainRoutes: RouteObject[] = [
    {
        path: '/',
        loader: () => redirect('/groups'),
    },
    {
        path: '/groups',
        element: <GroupsPage/>,
    },
];

