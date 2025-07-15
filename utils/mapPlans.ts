import { Feature, Plan, Tariff } from '@/types/PlansTable';

export function mapTariffsToPlans(tariffs: Tariff[]): Plan[] {
    return tariffs.map((tariff) => ({
        id: String(tariff.id),
        name: tariff.name,
        description: tariff.description,
        price: tariff.price,
    }));
}

export function mapTariffsToFeatures(tariffs: Tariff[]): Feature[] {
    return [
        {
            id: 'storage',
            label: 'Storage',
            values: tariffs.map((t) => `${t.storage} GB`),
        },
        {
            id: 'team_members',
            label: 'Team Members',
            values: tariffs.map((t) => t.team_members),
        },
        {
            id: 'support',
            label: 'Support',
            values: tariffs.map((t) => t.support_type),
        },
        {
            id: 'analytics',
            label: 'Analytics',
            values: tariffs.map((t) => t.analytics_type),
        },
        {
            id: 'api-access',
            label: 'API Access',
            values: tariffs.map((t) => t.api_access),
        },
        {
            id: 'mobile-app',
            label: 'Mobile App',
            values: tariffs.map((t) => t.mobile_app_access),
        },
        {
            id: 'custom-domains',
            label: 'Custom Domains',
            values: tariffs.map((t) => t.custom_domain),
        },
    ];
}
