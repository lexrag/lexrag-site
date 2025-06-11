"use client"

export const getMeClient = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}
