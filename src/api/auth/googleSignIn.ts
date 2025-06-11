import {setSession} from "@/utils/auth/setSession";

interface GoogleSignInParams {
    code: string;
}

export const googleSignIn = async (params: GoogleSignInParams): Promise<{ success: boolean; error?: string }> => {
    const response = await fetch(`/api/auth/signin/google/callback?code=${params.code}`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

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
