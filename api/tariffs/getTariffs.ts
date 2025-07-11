export const getTariffs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tariffs/tariffs`);

    const data = await response.json();

    return data.tariffs;
};
