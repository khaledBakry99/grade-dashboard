import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProposed: builder.query({
      query: ({ word }) => ({
        url: `/project/projects/?status__lte=2&ordering=-deadline&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Project"],
    }),
  }),
});

export const { useGetProposedQuery } = extendedApi;
