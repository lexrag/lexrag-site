import {axiosInstance} from "@/api/axiosInstance";


export const getGoogleAuthLink = async () => {
    try {
        const response = await axiosInstance.get('auth/signin/google')

        if (response.status === 200) {
            return { success: true, redirect_url: response.data.redirect_url };
        }
    } catch (error: any) {
        if (error.response) {
            return {success: false, error: error.response.data.detail || "Email verification failed"};
        }
        return {success: false, error: "Network error"};
    }
}
