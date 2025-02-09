import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: 'baseApi',
    tagTypes: ['Groups', 'Exercises', 'Workouts'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001',
    }),
    endpoints: () => ({}),
})