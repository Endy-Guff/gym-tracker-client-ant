import {baseApi} from "../base-api.ts";
import {IWorkout} from "../types/workout.ts";

const workoutApi = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            getWorkouts: builder.query<IWorkout[], void>({
                query: () => {
                    return {
                        url: '/workout',
                    }
                },
                providesTags: ['Workouts'],
            }),
            getWorkout: builder.query<IWorkout, { id: string }>({
                query: ({id}) => {
                    return {
                        url: `/workout/${id}`,
                    }
                },
                providesTags: ['Workouts'],
                async onCacheEntryAdded(arg, {cacheEntryRemoved}) {
                    if (arg.id === undefined) {
                        await cacheEntryRemoved;
                    }
                }
            }),
            createWorkout: builder.mutation<IWorkout, Pick<IWorkout, 'date'>>({
                query: ({date}) => {
                    return {
                        url: '/workout',
                        method: 'POST',
                        body: {date}
                    }
                },
                invalidatesTags: ['Workouts']
            }),
            // updateGroup: builder.mutation<IGroup, IGroup>({
            //     query: ({name, id}) => {
            //         return {
            //             url: `/group/${id}`,
            //             method: 'PATCH',
            //             body: {name}
            //         }
            //     },
            //     invalidatesTags: ['Groups']
            // }),
            // deleteGroup: builder.mutation<IGroup, Pick<IGroup, 'id'>>({
            //     query: ({id}) => {
            //         return {
            //             url: `/group/${id}`,
            //             method: 'DELETE',
            //         }
            //     },
            //     invalidatesTags: ['Groups']
            // })
        }
    }
})

export const {useGetWorkoutsQuery, useGetWorkoutQuery, useCreateWorkoutMutation} = workoutApi