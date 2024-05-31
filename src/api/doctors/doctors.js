import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctors: builder.query({
      query: ({ word }) => ({
        url: `/users/users/?is_admin=true&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Doctors"],
    }),
    addDoctors: builder.mutation({
      query: (body) => ({
        url: `/users/users/`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Doctors"],
    }),
  }),
});

export const { useGetAllDoctorsQuery, useAddDoctorsMutation } = extendedApi;
