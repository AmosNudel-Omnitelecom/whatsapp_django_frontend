import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PhoneNumbersResponse } from '../../../types';

export const phoneNumbersApi = createApi({
  reducerPath: 'phoneNumbersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: (process.env.REACT_APP_API_URL || 'http://localhost:9000/') + 'phone_numbers/',
  }),
  tagTypes: ['PhoneNumbers'],
  endpoints: (builder) => ({
    getPhoneNumbers: builder.query<PhoneNumbersResponse, void>({
      query: () => 'get-numbers/',
      providesTags: ['PhoneNumbers'],
    }),
    getSinglePhoneNumber: builder.query<any, string>({
      query: (wabaPhoneNumberId) => `single/?waba_phone_number_id=${wabaPhoneNumberId}`,
      providesTags: (result, error, wabaPhoneNumberId) => [{ type: 'PhoneNumbers', id: wabaPhoneNumberId }],
    }),
    // deletePhoneNumber: builder.mutation<void, string>({
    //   query: (numberId) => ({
    //     url: `delete/${numberId}/`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: ['PhoneNumbers'],
    // }),
    requestVerificationCode: builder.mutation<void, string>({
      query: (numberId) => ({
        url: 'request-code/',
        method: 'POST',
        body: { phone_number_id: numberId },
      }),
      invalidatesTags: ['PhoneNumbers'],
    }),
    verifyCode: builder.mutation<void, { numberId: string; code: string }>({
      query: ({ numberId, code }) => ({
        url: `verify-code/${numberId}`,
        method: 'POST',
        params: { code },
      }),
      invalidatesTags: ['PhoneNumbers'],
    }),
    addPhoneNumber: builder.mutation<{ id: string }, string>({
      query: (phoneNumber) => ({
        url: 'add/',
        method: 'POST',
        body: { phone_number: phoneNumber },
      }),
      invalidatesTags: ['PhoneNumbers'],
    }),
  }),
});

export const { useGetPhoneNumbersQuery, useGetSinglePhoneNumberQuery, useRequestVerificationCodeMutation, useVerifyCodeMutation, useAddPhoneNumberMutation } = phoneNumbersApi; 