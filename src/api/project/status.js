import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectStatus: builder.query({
      query: ({ status, word }) => ({
        url: `/project/projects/?status=${status}&ordering=updated_at&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Project"],
    }),
    addGrade: builder.mutation({
      query: ({ Grade, id }) => ({
        url: `/project/mark/${id}/`,
        method: "PUT",
        body: { grade: Grade },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useGetProjectStatusQuery, useAddGradeMutation } = extendedApi;
