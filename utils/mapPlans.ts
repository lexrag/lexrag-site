import { Plan } from '@/types/PlansTable';

export function mapPlans(PLANS: Plan[]): Plan[] {
    return PLANS.map((plan, idx) => ({
        ...plan,
        name: plan.name === 'Free' ? 'Basic' : plan.name,
        isCurrent: idx === 0,
        badge: idx === 0 ? 'Current Plan' : undefined,
        button: {
            label: idx === 0 ? 'Switch' : 'Upgrade',
            variant: (idx === 0 ? 'outline' : 'primary') as 'primary' | 'outline',
            disabled: idx === 0,
        },
    }));
}
