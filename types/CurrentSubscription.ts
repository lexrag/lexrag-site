export interface CurrentSubscription {
    id: string;
    tariff_id: string;
    user_id: string;
    status: string;
    detail?: string;
    tariff: Tariff;
    created_at: string;
}

export interface Tariff {
    name: string;
    description: string;
    price: number;
    storage: number;
    team_members: number;
    support_type: string;
    analytics_type: string;
    api_access: boolean;
    mobile_app_access: boolean;
    custom_domain: boolean;
    duration: number;
}
