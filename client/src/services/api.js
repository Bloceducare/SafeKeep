import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const Api = createApi({
  reducerPath: 'SampleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api/' }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: () => `character`, 
    }),
  }),
});

export const { useGetCharactersQuery } =  Api;