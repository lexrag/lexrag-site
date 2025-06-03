import {setSession} from "@/utils/auth/setSession";

interface SignInParams {
    email: string;
    password: string;
}

export const signIn = async (params: SignInParams): Promise<{ success: boolean; error?: string }> => {
    const response = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const data = await response.json()

    if (response.ok) {
        const token = data.access_token;
        localStorage.setItem("token", token);
        await setSession(token);
        return { success: true };
    }

    if (data?.detail) {
        return { success: false, error: data.detail || "Authentication failed" };
    } else {
        return { success: false, error: "Network error" };
    }
};
