import { axiosInstance } from "@/api/axiosInstance";
import {setSession} from "@/utils/auth/setSession";

interface SignInParams {
    email: string;
    password: string;
}

export const signIn = async (params: SignInParams): Promise<{ success: boolean; error?: string }> => {
    try {
        const response = await axiosInstance.post("/auth/signin", params);

        if (response.status === 200) {
            const token = response.data.access_token;
            localStorage.setItem("token", token);
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
            await setSession(token);
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return { success: false, error: error.response.data.detail || "Authentication failed" };
        }
        return { success: false, error: "Network error" };
    }
};
