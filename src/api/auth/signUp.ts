import {axiosInstance} from "@/api/axiosInstance";
import {setSession} from "@/utils/auth/setSession";

interface SignUpParams {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const signUp = async (params: SignUpParams) => {
    try {
        const response = await axiosInstance.post("/auth/signup", params);

        if (response.status === 200) {
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return { success: false, error: error.response.data.detail || "Sign up failed" };
        }
        return { success: false, error: "Network error" };
    }
}
