"use server"

import {cookies} from "next/headers";

export const getMeServer = async () => {
    const cookiesStore = await cookies();
    const session = cookiesStore.get("token")?.value;

    const response = await fetch("/api/auth/me", {
        headers: {
            "Authorization": `Bearer ${session}`,
        }
    });

    if (response.ok) {
        return await response.json();
    } else {
        return null;
    }
}

export default getMeServer;
