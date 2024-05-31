import { apiSlice } from "../api.slice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecialty: builder.query({
      query: ({ word }) => ({
        url: `/specialty/specialties/?search=${word}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      providesTags: ["Specialty"],
    }),
    deleteSpecialty: builder.mutation({
      query: ({ id }) => ({
        url: `/specialty/specialties/${id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Specialty"],
    }),
    addSpecialty: builder.mutation({
      query: ({ title }) => ({
        url: `/specialty/specialties/`,
        method: "POST",
        body: { title },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Specialty"],
    }),
    editSpecialty: builder.mutation({
      query: ({ id, title }) => ({
        url: `/specialty/specialties/${id}/`,
        method: "PUT",
        body: { title },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      invalidatesTags: ["Specialty"],
    }),
  }),
});

export const {
  useGetAllSpecialtyQuery,
  useAddSpecialtyMutation,
  useDeleteSpecialtyMutation,
  useEditSpecialtyMutation,
} = extendedApi;
