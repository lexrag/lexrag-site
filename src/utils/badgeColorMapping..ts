export const badgeColorMapping: Record<string, string> = {
    "search": "badge-primary",
    "query": "badge-success",
    "storage": "badge-warning",
    "analytics": "badge-info",
    "freemium": "badge-primary",
    "basic": "badge-success",
    "advanced": "badge-warning",
    "premium": "badge-info",
    "development": "badge-warning",
    "production": "badge-success",
    "ready": "badge-success",
    "not supported": "badge-danger",
    "suspended": "badge-warning",
};

export const getBadgeColor = (badge: string): string => {
    return badgeColorMapping[badge] || "badge-secondary";
};