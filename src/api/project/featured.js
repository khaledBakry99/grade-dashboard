import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatured: builder.query({
      query: ({ word }) => ({
        url: `/project/featured-project/?ordering=deadline&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Project"],
    }),
    addToFeatured: builder.mutation({
      query: ({ id, status }) => ({
        url: `/project/featured-project/${id}/`,
        method: "PUT",
        body: { is_featured: status },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Specialty"],
    }),
  }),
});

export const { useGetFeaturedQuery, useAddToFeaturedMutation } = extendedApi;
