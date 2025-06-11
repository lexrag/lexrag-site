interface SignUpParams {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const signUp = async (params: SignUpParams) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(params),
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    }

    if (data?.detail) {
        return { success: false, error: data.detail || "Sign up failed" };
    } else {
        return { success: false, error: "Network error" };
    }
}
