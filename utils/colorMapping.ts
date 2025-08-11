// Color mapping utility for features
export const getFeatureColor = (index: number): string => {
    const colors = [
        'bg-blue-500',
        'bg-green-500',
        'bg-purple-500',
        'bg-orange-500',
        'bg-red-500',
        'bg-indigo-500',
        'bg-pink-500',
        'bg-yellow-500',
        'bg-teal-500',
        'bg-cyan-500'
    ];
    
    return colors[index % colors.length];
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
        'text-cyan-600'
    ];
    
    return colors[index % colors.length];
};

export const getFeatureBorderColor = (index: number): string => {
    const colors = [
        'border-blue-200',
        'border-green-200',
        'border-purple-200',
        'border-orange-200',
        'border-red-200',
        'border-indigo-200',
        'border-pink-200',
        'border-yellow-200',
        'border-teal-200',
        'border-cyan-200'
    ];
    
    return colors[index % colors.length];
};

export const getBadgeColor = (category: string): string => {
    const colorMap: { [key: string]: string } = {
        'AI': 'bg-purple-100 text-purple-800 border-purple-200',
        'Graph': 'bg-blue-100 text-blue-800 border-blue-200',
        'Vector': 'bg-green-100 text-green-800 border-green-200',
        'Legal': 'bg-orange-100 text-orange-800 border-orange-200',
        'Research': 'bg-indigo-100 text-indigo-800 border-indigo-200',
        'Analysis': 'bg-pink-100 text-pink-800 border-pink-200',
        'Database': 'bg-teal-100 text-teal-800 border-teal-200',
        'Search': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'default': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    
    return colorMap[category] || colorMap.default;
};

export const getCategoryColorScheme = (category: string): { bg: string; text: string; border: string; gradient: string; icon_color: string } => {
    const colorMap: { [key: string]: { bg: string; text: string; border: string; gradient: string; icon_color: string } } = {
        'AI': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-500 to-purple-600', icon_color: 'text-purple-600' },
        'Graph': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-500 to-blue-600', icon_color: 'text-blue-600' },
        'Vector': { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', gradient: 'from-green-500 to-green-600', icon_color: 'text-green-600' },
        'Legal': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-500 to-orange-600', icon_color: 'text-orange-600' },
        'Research': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200', gradient: 'from-indigo-500 to-indigo-600', icon_color: 'text-indigo-600' },
        'Analysis': { bg: 'bg-pink-50', text: 'text-pink-700', border: 'border-pink-200', gradient: 'from-pink-500 to-pink-600', icon_color: 'text-pink-600' },
        'Database': { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200', gradient: 'from-teal-500 to-teal-600', icon_color: 'text-teal-600' },
        'Search': { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', gradient: 'from-yellow-500 to-yellow-600', icon_color: 'text-yellow-600' },
        'default': { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', gradient: 'from-gray-500 to-gray-600', icon_color: 'text-gray-600' }
    };
    
    return colorMap[category] || colorMap.default;
};
