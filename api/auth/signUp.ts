interface SignUpParams {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export const signUp = async (params: SignUpParams) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();

    if (response.ok) {
        return { success: true };
    }

    if (data?.detail) {
        return { success: false, error: data.detail || 'Sign up failed' };
    } else {
        return { success: false, error: 'Network error' };
    }
};
