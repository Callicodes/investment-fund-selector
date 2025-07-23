import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// This file defines the fund API service using RTK Query
export const fundApi = createApi({
  reducerPath: 'fundApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cdn.core3-dev.ajbbuild.uk/interview/' }),
  endpoints: (builder) => ({
    getFundData: builder.query({
      query: (fundId) => `${fundId}.json`, // Now just the relative URL
    }),
  }),
});

export const { useGetFundDataQuery } = fundApi;
