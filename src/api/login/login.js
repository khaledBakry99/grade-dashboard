import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/users/email-login/`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        const data = await queryFulfilled;
        if (data) {
          localStorage.setItem("access", data?.data?.data?.access);
          localStorage.setItem("userId", data?.data?.data?.id);
          localStorage.setItem("is_admin", data?.data?.data?.is_admin);
          localStorage.setItem("username", data?.data?.data?.username);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = extendedApi;
