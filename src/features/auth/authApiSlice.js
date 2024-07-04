// authApiSlice.js

import { apiSlice } from '../../app/api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: 'auth',
                method: 'POST',
                body: credentials  // Sūta pieprasījumu ar ievadītajiem dati
            })
        }),
    })
});

export const { useLoginMutation } = authApiSlice;
