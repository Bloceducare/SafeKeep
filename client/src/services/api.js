import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";
import { graphqlEndpoint } from "../config/constants/endpoints";

export const Api = createApi({
  reducerPath: "api",
  baseQuery: graphqlRequestBaseQuery({ url: graphqlEndpoint }),
  endpoints: (builder) => ({
    getTokenHistory: builder.query({
      query: (tk, skip = 0) => {
        return {
          document: gql`
          {
            vaults(where: { owner: "${localStorage.safekeepAddress}" }) {
              tokens ( where:{id:"${tk}"}  skip:${skip} first:10) {
                id
                amount
                history {id type amount createdAt}
               }
            }
          }
          `,
        };
      },
    }),
    getAllTokensHistory: builder.query({
      query: (tk, skip = 0) => {},
    }),
  }),
});

console.log(Api, "checking api");
export const { useGetTokenHistoryQuery } = Api;
