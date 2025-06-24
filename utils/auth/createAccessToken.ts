export const createAccessToken = async (params: object) => {
    const response = await fetch('/auth/create-token', {
        method: "POST",
        body: JSON.stringify(params),
    })

    const data = await response.json();

    if (response.ok) {
        return data.access_token;
    } else {
        console.log('Failed to verify session')
    }
}
