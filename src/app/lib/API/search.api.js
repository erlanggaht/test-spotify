import axios from "axios"
import { getSession } from "next-auth/react";


const searchInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEARCH_API
})


searchInstance.interceptors.request.use( async function (config) {
    const session = await getSession();
        config.headers.Authorization = "Bearer " + session.token
        return config   
});

export const SearchAPI = {
    getAll:async (config) => {
        const params = config.params || {}
        try {
            const response = await searchInstance("/search",{
                method: "GET",
                params: {
                    ...params,
                    market: "ES"
                },
            })
            return response
        } catch (error) {
            throw new Error(
            JSON.stringify(
                {
                error: error.message,
                nameAPI: "Search API getAll", 
                response_status: error?.status
            })
            )
        }
    }
}