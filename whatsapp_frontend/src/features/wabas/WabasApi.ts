import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WABAResponse, WABAPhoneNumbersResponse, WebhookSubscriptionsResponse } from '../../../types';


export const wabaApi = createApi({
  reducerPath: 'wabaApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: (process.env.REACT_APP_API_URL || 'http://localhost:9000/') + 'wabas/',
  }),
  tagTypes: ['WABAs', 'WABAPhoneNumbers'],
  endpoints: (builder) => ({
    getWABAs: builder.query<WABAResponse, void>({
      query: () => '',
      providesTags: ['WABAs'],
    }),
    getClientWABAs: builder.query<WABAResponse, void>({
      query: () => 'client/',
      providesTags: ['WABAs'],
    }),
    getWABAPhoneNumbers: builder.query<WABAPhoneNumbersResponse, string>({
      query: (wabaId) => `phone-numbers/?waba_id=${wabaId}`,
      providesTags: (result, error, wabaId) => [{ type: 'WABAPhoneNumbers', id: wabaId }],
    }),
    getWABASubscriptions: builder.query<WebhookSubscriptionsResponse, string>({
      query: (wabaId) => `webhook-subscriptions/?waba_id=${wabaId}`,
      providesTags: (result, error, wabaId) => [{ type: 'WABAs', id: wabaId }],
    }),
    subscribeWebhooks: builder.mutation<any, string>({
      query: (wabaId) => ({
        url: `webhook-subscribe/`,
        method: 'POST',
        body: { waba_id: wabaId },
      }),
      invalidatesTags: (result, error, wabaId) => [{ type: 'WABAs', id: wabaId }],
    }),
    registerPhoneNumber: builder.mutation<{ success: boolean }, { phoneNumberId: string; pin: string }>({
      query: ({ phoneNumberId, pin }) => ({
        url: `phone-numbers/register/`,
        method: 'POST',
        body: { waba_phone_number_id: phoneNumberId, pin },
      }),
      invalidatesTags: (result, error, { phoneNumberId }) => [{ type: 'WABAPhoneNumbers', id: phoneNumberId }],
    }),
    verifyCode: builder.mutation<any, { phoneNumberId: string; code: string }>({
      query: ({ phoneNumberId, code }) => ({
        url: `exchange-code-for-token/`,
        method: 'POST',
        body: { phone_number_id: phoneNumberId, code },
      }),
      invalidatesTags: (result, error, { phoneNumberId }) => [{ type: 'WABAPhoneNumbers', id: phoneNumberId }],
    }),
  }),
});

export const { 
  useGetWABAsQuery, 
  useGetClientWABAsQuery, 
  useGetWABAPhoneNumbersQuery,
  useGetWABASubscriptionsQuery,
  useSubscribeWebhooksMutation,
  useRegisterPhoneNumberMutation,
  useVerifyCodeMutation
} = wabaApi; 