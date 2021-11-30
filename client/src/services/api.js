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


const fetchTokenPrice =  async(tok) => {
  // console.log(tok)
  if(!tok?.token_address) return;
  return await token
    .getTokenPrice({ chain:chainId, address:tok.token_address})
    .then((result) => {
return setCurrentAsset({...currentAsset, price:result?.usdPrice})
  //    return console.log(result)
    })
    .catch((e) =>{});
};