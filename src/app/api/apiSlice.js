// redux/api/apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../../features/auth/authSlice';
import { logoutUser as logoutUserAction } from '../../features/logout/logoutSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log('sending refresh token');
        const refreshResult = await baseQuery('/refresh', api, extraOptions);
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logoutUserAction()); // Izsauc logoutUser akciju, lai atzīmētu lietotāju kā izrakstītu
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'api/users/login',
                method: 'POST',
                body: credentials
            })
        }),

    })
});

export const { useLoginMutation } = apiSlice;
