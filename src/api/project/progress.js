import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgress: builder.query({
      query: ({ word }) => ({
        url: `/project/projects/?status=5&ordering=created_at&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Project"],
    }),
    acceptOrReject: builder.mutation({
      query: ({ deadline, is_accepted, id }) => ({
        url: `/project/review-proposal/${id}/`,
        method: "PUT",
        body: { deadline: deadline, is_accepted: is_accepted },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProgressQuery, useAcceptOrRejectMutation } = extendedApi;
