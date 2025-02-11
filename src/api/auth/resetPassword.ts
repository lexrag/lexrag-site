import {axiosInstance} from "@/api/axiosInstance";

interface ResetPasswordParams {
    email: string;
    token: string;
    new_password: string;
}

export const resetPassword = async (params: ResetPasswordParams) => {
    try {
        const response = await axiosInstance.post(`auth/reset-password`, params)

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return {success: false, error: error.response.data.detail || "Password reset failed"};
        }
        return {success: false, error: "Network error"};
    }
}
