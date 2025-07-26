'use client';

export const getRuns = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/evaluator/runs`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await response.json();

    if (response.ok) {
        return data.runs;
    } else {
        return [];
    }
};
