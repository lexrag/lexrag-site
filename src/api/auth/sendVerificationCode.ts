import {axiosInstance} from "@/api/axiosInstance";

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await axiosInstance.post(`auth/send-code/${email}`)

        if (response.status === 200) {
            const delay = Number.parseInt(process.env.NEXT_PUBLIC_VERIFICATION_CODE_TTL);
            const unlockTime = Date.now() + delay * 1000;
            localStorage.setItem("resendDisabledUntil", unlockTime.toString());
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return {success: false, error: error.response.data.detail || "Authentication failed"};
        }
        return {success: false, error: "Network error"};
    }
}
