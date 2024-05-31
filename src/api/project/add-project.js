import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProject: builder.mutation({
      query: (body) => ({
        url: `/project/projects/`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Project"],
    }),
  }),
});

export const { useAddProjectMutation } = extendedApi;
