import {baseApi} from "../base-api.ts";
import {ICreateExerciseArgs, IExercise, IUpdateExerciseArgs} from "../types/exercise.ts";

const groupApi = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            getExercises: builder.query<IExercise[], void>({
                query: () => {
                    return {
                        url: '/exercise',
                    }
                },
                providesTags: ['Exercises'],
            }),
            createExercises: builder.mutation<IExercise, ICreateExerciseArgs>({
                query: (arg) => {
                    return {
                        url: '/exercise',
                        method: 'POST',
                        body: arg
                    }
                },
                invalidatesTags: ['Exercises']
            }),
            updateExercises: builder.mutation<IExercise, IUpdateExerciseArgs>({
                query: ({name, groupId, id}) => {
                    return {
                        url: `/exercise/${id}`,
                        method: 'PATCH',
                        body: {name, groupId}
                    }
                },
                invalidatesTags: ['Exercises']
            }),
            deleteExercises: builder.mutation<IExercise, Pick<IExercise, 'id'>>({
                query: ({id}) => {
                    return {
                        url: `/exercise/${id}`,
                        method: 'DELETE',
                    }
                },
                invalidatesTags: ['Exercises']
            })
        }
    }
})

export const {
    useCreateExercisesMutation,
    useGetExercisesQuery,
    useDeleteExercisesMutation,
    useUpdateExercisesMutation
} = groupApi