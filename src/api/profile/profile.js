import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/users/profile/`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Profile"],
    }),
    editProfile: builder.mutation({
      query: (body) => ({
        url: `/users/profile/`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery, useEditProfileMutation } = extendedApi;
