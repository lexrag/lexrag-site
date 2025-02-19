import {getAuthorizedAxiosInstance} from "@/api/authorizedAxiosInstance";

export const getMe = async () => {
    try {
        const axiosInstance = await getAuthorizedAxiosInstance();
        const response = await axiosInstance.get("/auth/me");

        if (response.status === 200) {
            return await response.data;
        }
    } catch (error: any) {
        console.log(error)
        if (error.response) {
            return { success: false, error: error.response.data.detail || "Authentication failed" };
        }
        return { success: false, error: "Network error" };
    }
}
