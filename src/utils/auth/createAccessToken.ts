import {axiosInstance} from "@/api/axiosInstance";

export const createAccessToken = async (data: object) => {
    try {
        const response = await axiosInstance.post('/auth/create-token', data)
        if (response.status === 200) {
            return response.data.access_token;
        }
    } catch (error) {
        console.log('Failed to verify session')
    }
}
