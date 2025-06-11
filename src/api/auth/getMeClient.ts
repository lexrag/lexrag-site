"use client"

export const getMeClient = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error fetching /auth/me:", error);
    }

    return null;
}