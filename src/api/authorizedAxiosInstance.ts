import {cookies} from "next/headers";
import axios from "axios";

export const getAuthorizedAxiosInstance = async () => {
    const cookiesStore = await cookies();
    const session = cookiesStore.get("session")?.value;

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
        withCredentials: false,
        headers: {
            "Content-Type": "application/json",
            ...(session && { "Authorization": `Bearer ${session}` }),
        },
    });
};
