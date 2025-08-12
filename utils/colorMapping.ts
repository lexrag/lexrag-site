// badgeColorMapping.ts
import '@/components/ui/css-variables.css';

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

// Function to get badge color variant
export const getBadgeColor = (
    value: string,
): 'primary' | 'success' | 'warning' | 'info' | 'destructive' | 'secondary' => {
    return badgeColorMapping[value] || 'secondary';
};

export const getFeatureTextColor = (index: number): string => {
    const colors = [
        'text-blue-600',
        'text-green-600',
        'text-purple-600',
        'text-orange-600',
        'text-red-600',
        'text-indigo-600',
        'text-pink-600',
        'text-yellow-600',
        'text-teal-600',
        'text-cyan-600',
    ];

    return colors[index % colors.length];
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
        icon_color: 'text-cyan-500 ',
        border: 'hover:border-cyan-500',
        gradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    },
    query: {
        icon_color: 'text-purple-500',
        border: 'hover:border-purple-500',
        gradient: 'from-purple-500 via-purple-600 to-purple-700',
    },
    storage: {
        icon_color: 'text-emerald-500',
        border: 'hover:border-emerald-500',
        gradient: 'from-emerald-500 via-emerald-600 to-emerald-700',
    },
    analytics: {
        icon_color: 'text-[var(--Brand-Primary-Axis-Indigo)]',
        border: 'hover:border-[var(--Brand-Primary-Axis-Indigo)]',
        gradient:
            'from-[var(--Brand-Primary-Axis-Indigo)] via-[var(--Brand-Primary-Axis-Indigo)] to-[var(--Brand-Primary-Axis-Indigo)]',
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
            icon_color: 'text-gray-500',
            border: 'hover:border-gray-400',
            gradient: 'from-gray-500 via-gray-600 to-gray-700',
        }
    );
};
