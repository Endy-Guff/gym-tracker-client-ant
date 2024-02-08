import {baseApi} from "../base-api.ts";
import {IGroup} from "../types/group.ts";

const groupApi = baseApi.injectEndpoints({
    endpoints: builder => {
        return {
            getGroups: builder.query<IGroup[], void>({
                query: () => {
                    return {
                        url: '/group',
                    }
                },
                providesTags: ['Groups'],
            }),
            createGroup: builder.mutation<IGroup, Pick<IGroup, 'name'>>({
                query: ({name}) => {
                    return {
                        url: '/group',
                        method: 'POST',
                        body: {name}
                    }
                },
                invalidatesTags: ['Groups']
            }),
            updateGroup: builder.mutation<IGroup, IGroup>({
                query: ({name, id}) => {
                    return {
                        url: `/group/${id}`,
                        method: 'PATCH',
                        body: {name}
                    }
                },
                invalidatesTags: ['Groups']
            }),
            deleteGroup: builder.mutation<IGroup, Pick<IGroup, 'id'>>({
                query: ({id}) => {
                    return {
                        url: `/group/${id}`,
                        method: 'DELETE',
                    }
                },
                invalidatesTags: ['Groups']
            })
        }
    }
})

export const {useGetGroupsQuery, useCreateGroupMutation, useUpdateGroupMutation, useDeleteGroupMutation} = groupApi