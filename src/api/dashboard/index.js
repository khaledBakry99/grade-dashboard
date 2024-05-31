import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardInfo: builder.query({
      query: () => ({
        url: `/users/home-doctor/`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetDashboardInfoQuery } = extendedApi;
