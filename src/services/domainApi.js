import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const domainApi = createApi({
  reducerPath: 'domainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://6797aa2bc2c861de0c6d964c.mockapi.io/',
  }),
  tagTypes: ['Domain'],
  endpoints: (builder) => ({
    getDomains: builder.query({
      query: () => ({
        url: 'domain',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Domain', id: _id })),
              { type: 'Domain', id: 'LIST' },
            ]
          : [{ type: 'Domain', id: 'LIST' }],
    }),
    getDomainById: builder.query({
      query: (id) => `domain/${id}`,
      providesTags: (result, error, id) => [{ type: 'Domain', id }],
    }),
    addDomain: builder.mutation({
      query: (newDomain) => ({
        url: 'domain',
        method: 'POST',
        body: newDomain,
      }),
      invalidatesTags: [{ type: 'Domain', id: 'LIST' }],
    }),
    updateDomain: builder.mutation({
      query: ({ id, payload }) => ({
        url: `domain/${id}`,
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Domain', id },
        { type: 'Domain', id: 'LIST' },
      ],
    }),
    deleteDomain: builder.mutation({
      query: (id) => ({
        url: `domain/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Domain', id },
        { type: 'Domain', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetDomainsQuery,
  useGetDomainByIdQuery,
  useAddDomainMutation,
  useUpdateDomainMutation,
  useDeleteDomainMutation,
} = domainApi;
