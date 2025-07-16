export const getTariffs = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/tariffs`);
    const data = await response.json();
    return {
        tariffs: data.tariffs,
        features: data.features,
    };
};
