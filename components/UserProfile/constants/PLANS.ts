import { boolean } from 'zod';
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
    {
        id: 'enterprise',
        name: 'Enterprise',
        description: 'For large enterprises',
        priceMonthly: '$100',
        priceAnnual: '$80',
    },
];

export const FEATURES = [
    {
        id: 'storage',
        label: 'Storage',
        values: ['10 GB', '50 GB', '100 GB', 'Custom'],
    },
    {
        id: 'users',
        label: 'Team Members',
        values: ['1 user', 'Up to 10 users', 'Up to 50 users', 'Custom'],
    },
    {
        id: 'support',
        label: 'Support',
        values: ['Email', 'Priority email', '24/7 phone & email', 'Custom'],
    },
    {
        id: 'analytics',
        label: 'Analytics',
        values: ['Basic', 'Pro', 'Premium', 'Full'],
    },
    {
        id: 'api-access',
        label: 'API Access',
        values: [false, true, true, true],
    },
    {
        id: 'mobile-app',
        label: 'Mobile App',
        values: [false, false, true, true],
    },
    {
        id: 'custom-domains',
        label: 'Custom Domains',
        values: [false, false, false, true],
    },
];
