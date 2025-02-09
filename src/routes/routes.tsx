import {RouteObject, redirect} from 'react-router-dom';
import {GroupsPage} from "./groups";
import {ExercisesPage} from "./exercises";
import {WorkoutsPage} from "./workouts";
import {WorkoutPage} from "./workout";

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
    {
        path: '/workouts',
        element: <WorkoutsPage/>,
    },
    {
        path: '/workouts/:id',
        element: <WorkoutPage/>,
    },
];

