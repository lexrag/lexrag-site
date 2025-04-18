"use client"

import axios from "axios";
import https from "https";

const agent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
});

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
    httpAgent: agent,
    httpsAgent: agent,
})
