"use client"

export const getMeClient = async () => {
    const response = await fetch("/api/auth/me", {
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
