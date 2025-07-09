import { Plan } from '@/types/PlansTable';

export const PLANS: Plan[] = [
    {
        id: 'free',
        name: 'Free',
        description: 'For personal use',
        priceMonthly: '$0',
        priceAnnual: '$0',
    },
    {
        id: 'pro',
        name: 'Pro',
        description: 'For professionals',
        priceMonthly: '$15',
        priceAnnual: '$10',
    },
    {
        id: 'premium',
        name: 'Premium',
        description: 'For large teams',
        priceMonthly: '$30',
        priceAnnual: '$20',
    },
];

export const FEATURES = [
    {
        id: 'storage',
        label: 'Storage',
        values: ['10 GB', '100 GB', 'Unlimited'],
    },
    {
        id: 'users',
        label: 'Team Members',
        values: ['1 user', 'Up to 10 users', 'Unlimited users'],
    },
    {
        id: 'support',
        label: 'Support',
        values: ['Email', 'Priority email', '24/7 phone & email'],
    },
    {
        id: 'analytics',
        label: 'Analytics',
        values: ['Basic', 'Advanced', 'Custom'],
    },
    {
        id: 'api-access',
        label: 'API Access',
        values: ['No', 'Yes', 'Yes'],
    },
];
