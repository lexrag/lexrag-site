export interface Plan {
    id: string;
    name: string;
    description?: string;
    priceMonthly?: string;
    priceAnnual?: string;
    isCurrent?: boolean;
    badge?: string;
    button?: PlanButton;
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
    annual: boolean;
}

export interface PlanButton {
    label: string;
    variant: 'primary' | 'outline';
    disabled?: boolean;
}
