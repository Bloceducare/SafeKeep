import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { graphqlEndpoint } from "../config/constants/endpoints";
import { gql } from "graphql-request";

//const currentUser = localStorage.safekeepAddress;
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
  }),
});

export const { useGetTokenHistoryQuery } = Api;
