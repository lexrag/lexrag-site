import {axiosInstance} from "@/api/axiosInstance";

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await axiosInstance.post(`auth/send-code/${email}`)

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return {success: false, error: error.response.data.detail || "Authentication failed"};
        }
        return {success: false, error: "Network error"};
    }
}
