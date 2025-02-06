"use client"

import {deleteSession} from "@/utils/auth/deleteSession";
import {redirect} from "next/navigation";

export const logOut = async () => {
    localStorage.removeItem("token")
    await deleteSession()
    redirect("/auth/signin")
}
