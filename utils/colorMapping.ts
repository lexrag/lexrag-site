// badgeColorMapping.ts

// 1. Maps badge values (e.g. "search", "freemium") to variant names used in <Badge />
export const badgeColorMapping: Record<
    string,
    'primary' | 'success' | 'warning' | 'info' | 'destructive' | 'secondary'
> = {
    search: 'primary',
    query: 'success',
    storage: 'warning',
    analytics: 'info',

    freemium: 'primary',
    basic: 'success',
    advanced: 'warning',
    premium: 'info',

    development: 'warning',
    production: 'success',

    ready: 'success',
    'not supported': 'destructive',
    suspended: 'warning',
};

export const getBadgeColor = (
    badge: string,
): 'primary' | 'success' | 'warning' | 'info' | 'destructive' | 'secondary' => {
    return badgeColorMapping[badge] ?? 'secondary';
};

// 2. Maps category values (e.g. "search") to icon/border/gradient colors for cards
export const categoryColorScheme: Record<
    string,
    {
        icon_color: string;
        border: string;
        gradient: string;
    }
> = {
    search: {
        icon_color: 'text-blue-500 dark:text-blue-300',
        border: 'hover:border-blue-500 dark:hover:border-blue-300',
        gradient: 'from-blue-400 via-blue-500 to-blue-600 dark:from-blue-300 dark:via-blue-400 dark:to-blue-500',
    },
    query: {
        icon_color: 'text-green-500 dark:text-green-300',
        border: 'hover:border-green-500 dark:hover:border-green-300',
        gradient: 'from-green-500 via-green-600 to-green-700',
    },
    storage: {
        icon_color: 'text-yellow-500 dark:text-yellow-300',
        border: 'hover:border-yellow-500 dark:hover:border-yellow-300',
        gradient: 'from-yellow-500 via-yellow-600 to-yellow-700',
    },
    analytics: {
        icon_color: 'text-purple-500 dark:text-purple-300',
        border: 'hover:border-purple-500 dark:hover:border-purple-300',
        gradient: 'from-purple-500 via-purple-600 to-purple-700',
    },
};

// 3. Utility function to get card color scheme based on category
export const getCategoryColorScheme = (
    category: string,
): {
    icon_color: string;
    border: string;
    gradient: string;
} => {
    return (
        categoryColorScheme[category] ?? {
            icon_color: 'text-gray-500 dark:text-gray-300',
            border: 'hover:border-gray-400 dark:hover:border-gray-300',
            gradient: 'from-gray-500 via-gray-600 to-gray-700',
        }
    );
};
