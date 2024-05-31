import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllSession: builder.query({
            query: () => ({
                url: `/project/session/`,
                method: "GET",
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
            },
            providesTags: ["Session"],
        }),
        addSession: builder.mutation({
            query: (body) => ({
                url: `/project/session/`,
                method: "POST",
                body: body,
            }),
            async onQueryStarted(_, { queryFulfilled }) {
                await queryFulfilled;
            },
            invalidatesTags: ["Session"],
        }),
    }),
});

export const {
    useAddSessionMutation, useGetAllSessionQuery
} = extendedApi;
