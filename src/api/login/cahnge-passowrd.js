import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/users/change-password/`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = extendedApi;
