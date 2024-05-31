import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecent: builder.query({
      query: ({ word }) => ({
        url: `/project/projects/?ordering=-created_at&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Project"],
    }),
  }),
});

export const { useGetRecentQuery } = extendedApi;
