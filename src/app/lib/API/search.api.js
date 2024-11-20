import axios from "axios"
import { getSession } from "next-auth/react";


const searchInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SEARCH_API
})


// searchInstance.interceptors.request.use = (async (config) => {
//     const session = await getSession();
//     if(session) {
//         config.headers.Authorization = "Bearer " + session.token
//         return config   
//     }
// })

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
                // headers: {
                //     Authorization: "Bearer " + "BQAYdWdSomqOqM00lOfGjGTwPr91FrN_qz8ErgbjFZOJ6ps9hzGHWrdV1eVaIfS-KgHyHvizCEzmNfotU6qffv0i-kme_FTWdh3wDCiov5o8ANR9YUq4H3fgn1Y9fNgV8l9r3enXR0EfhWH3DYgAW3iGq98W2BArRH1nWI825zSAZbgome9SHsLwzNu0tLf4dFCw9aM83p564dRiOlY"
                // }
            })
            return response
        } catch (error) {
            throw new Error(
            JSON.stringify(
                {
                error: error.message,
                nameAPI: "Search API getAll" 
            })
            )
        }
    }
}