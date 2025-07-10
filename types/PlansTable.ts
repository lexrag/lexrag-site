export interface Plan {
    id: string;
    name: string;
    description?: string;
    price: number;
    isCurrent?: boolean;
    button?: PlanButton;
}

export interface Tariff {
    id: number;
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

export interface PlansTableProps {
    currentPlanId: string;
    onChangePlan: (planId: string) => void;
}

export interface Feature {
    id: string;
    label: string;
    values: (string | React.ReactNode)[];
}

export interface FeatureRowProps {
    feature: Feature;
}

export interface PlansRowProps {
    plan: Plan;
    idx: number;
    currentPlanId: string;
    onChangePlan: (planId: string) => void;
}

export interface PlanButton {
    label: string;
    variant: 'primary' | 'outline';
    disabled?: boolean;
}
