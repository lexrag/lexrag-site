import {axiosInstance} from "@/api/axiosInstance";
import {setSession} from "@/utils/auth/setSession";

type SignUpParams = {
    email: string;
    password: string;
}

export const signUp = async (params: SignUpParams) => {
    try {
        const response = await axiosInstance.post("/auth/signup", params);

        if (response.status === 200) {
            localStorage.setItem("token", response.data.access_token);
            axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + response.data.access_token;
            await setSession(response.data.access_token);
            return { success: true };
        }
    } catch (error: any) {
        if (error.response) {
            return { success: false, error: error.response.data.detail || "Authentication failed" };
        }
        return { success: false, error: "Network error" };
    }
}
