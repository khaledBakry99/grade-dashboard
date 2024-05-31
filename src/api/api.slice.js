import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://154.62.109.112:8010/api";

export const apiSlice = createApi({
  tagTypes: [
    "Project",
    "Specialty",
    "Doctors",
    "Students",
    "Profile",
    "Session",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: async (headers) => {
      const access = localStorage.getItem("access");
      headers.set("authorization", `JWT ${access}`);
      return headers;
    },
  }),
  endpoints: () => ({}),
});
