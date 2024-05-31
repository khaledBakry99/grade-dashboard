import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: ({ word }) => ({
        url: `/users/users/?is_admin=false&is_superuser=false&search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
         
      },
      providesTags: ["Students"],
    }),
  }),
});

export const { useGetAllStudentsQuery } = extendedApi;
