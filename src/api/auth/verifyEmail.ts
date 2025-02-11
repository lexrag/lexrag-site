import {axiosInstance} from "@/api/axiosInstance";

interface VerifyEmailParams {
    email: string;
    code: string;
}

export const verifyEmail = async (params: VerifyEmailParams) => {
    try {
        const response = await axiosInstance.post('auth/verify-email', params)

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return {success: false, error: error.response.data.detail || "Email verification failed"};
        }
        return {success: false, error: "Network error"};
    }
}
