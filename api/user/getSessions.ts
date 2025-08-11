import { LoginSession } from '@/types/Session';

export interface SessionsPaginatedResponse {
    sessions: LoginSession[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

export const getSessions = async (limit = 10, offset = 0): Promise<SessionsPaginatedResponse | null> => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/sessions?limit=${limit}&offset=${offset}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (response.ok) {
        return response.json();
    }

    return null;
};
