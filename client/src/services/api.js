import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const Api = createApi({
  reducerPath: 'SampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://*************/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => `getassets`, 
    }),
  }),
});

export const { useGetCharactersQuery } =  Api;