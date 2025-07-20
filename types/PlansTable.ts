import { CurrentSubscription } from './CurrentSubscription';

export interface TariffFeature {
    id: string;
    name: string;
    lookup_key: string;
    metadata: Record<string, any>;
}

export interface Tariff {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    is_active: boolean;
    features: TariffFeature[];
    stripe_product_id: string;
    stripe_price_id: string;
    created_at: string;
}

export interface PlansTableProps {
    currentSubscription: CurrentSubscription | null;
    onChangePlan: (planId: string) => void;
    onCancelPlan?: () => void;
}

export interface FeatureRowData {
    id: string;
    label: string;
    values: boolean[]; // true if plan has this feature, false otherwise
}

export interface FeatureRowProps {
    feature: FeatureRowData;
}

export interface PlansRowProps {
    plan: Tariff;
    idx: number;
    currentPlanId: string | null;
    onChangePlan: (planId: string) => void;
    onCancelPlan?: () => void;
    annual?: boolean;
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
