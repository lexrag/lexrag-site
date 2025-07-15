import { CurrentSubscription } from './CurrentSubscription';

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
    currentSubscription: CurrentSubscription | null;
    onChangePlan: (planId: string) => void;
    onCancelPlan?: () => void;
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
    currentPlanId: string | null;
    onChangePlan: (planId: string) => void;
    onCancelPlan?: () => void;
}

export interface PlanButton {
    label: string;
    variant: 'primary' | 'outline';
    disabled?: boolean;
}

export interface Payment {
    id: number;
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    invoice_pdf_url: string;
    invoice_hosted_url: string;
    description: string;
    created_at: string;
}

export interface PaymentHistoryResponse {
    payments: Payment[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}
