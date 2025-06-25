export const badgeColorMapping: Record<string, string> = {
    "search": "primary",
    "query": "success",
    "storage": "warning",
    "analytics": "info",
    "freemium": "primary",
    "basic": "success",
    "advanced": "warning",
    "premium": "info",
    "development": "warning",
    "production": "success",
    "ready": "success",
    "not supported": "destructive",
    "suspended": "warning",
};

export const getBadgeColor = (badge: string): any => {
    return badgeColorMapping[badge] || "secondary";
};