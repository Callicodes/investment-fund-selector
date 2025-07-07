import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const fundApi = createApi({
  reducerPath: 'fundApi', 
  baseQuery: fetchBaseQuery({ baseUrl: '' }), 
  endpoints: (builder) => ({
    getFundData: builder.query({
      query: (fundId) => `https://cdn.core3-dev.ajbbuild.uk/interview/${fundId}.json`,
    }),
  }),
});

export const { useGetFundDataQuery } = fundApi;