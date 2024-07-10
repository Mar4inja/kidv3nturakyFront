// src/redux/api/apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logoutUser as logoutUserAction } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log('sending refresh token');
        const refreshResult = await baseQuery('/api/users/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutUserAction());  // Izsauc `logoutUser` akciju, lai atzīmētu lietotāju kā izrakstītu
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/users/login',
                method: 'POST',
                body: credentials
            })
        }),
        // Endpoint for deleting a user account
        deleteUserAccount: builder.mutation({
            query: () => ({
                url: '/api/users/auth/me',
                method: 'DELETE'
            })
        }),
        // Endpoint for updating user profile
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: '/api/users/auth/profile',
                method: 'PUT',
                body: userData
            })
        }),
        // Add other endpoints as needed
    })
});

// Eksportējiet hooks no `apiSlice`
export const { useLoginMutation, useDeleteUserAccountMutation, useUpdateProfileMutation } = apiSlice;
