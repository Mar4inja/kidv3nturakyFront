import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';
import { logoutUser as logoutUserAction } from '../../features/logout/logoutSlice';

// Define the base query with the re-auth logic
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
        console.log('Sending refresh token');
        const refreshResult = await baseQuery('/api/users/access', api, extraOptions);  // Corrected endpoint for refreshing tokens
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutUserAction()); // Dispatch the logoutUser action to log the user out
        }
    } else if (result?.error?.status === 401) {
        api.dispatch(logoutUserAction()); // Log the user out for unauthorized errors
    }

    return result;
};

// Create the API slice
export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        // Login endpoint
        login: builder.mutation({
            query: credentials => ({
                url: '/api/users/login',
                method: 'POST',
                body: credentials
            })
        }),
        // Update user profile
        updateProfile: builder.mutation({
            query: userData => ({
                url: '/api/users/auth/me',
                method: 'PUT',
                body: userData
            })
        }),
        // Endpoint for deleting a user account
        deleteUserAccount: builder.mutation({
            query: () => ({
                url: '/api/users/auth/me',
                method: 'DELETE'
            })
        }),
    })
});

// Export hooks from `apiSlice`
export const { useLoginMutation, useUpdateProfileMutation, useDeleteUserAccountMutation } = apiSlice;
