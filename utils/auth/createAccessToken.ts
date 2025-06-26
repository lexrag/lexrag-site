export const createAccessToken = async (params: object) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/create-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(params),
    });

    const data = await response.json();

    if (response.ok) {
        return data.access_token;
    } else {
        console.log('Failed to verify session');
    }
};
