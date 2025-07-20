import { CreditCard, Settings, Shield, ShieldCheck, User } from 'lucide-react';

export const MENU_ITEMS = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Security', href: '/profile/security', icon: Shield },
    { name: 'Settings', href: '/profile/settings', icon: Settings },
    { name: 'Billing', href: '/profile/billing', icon: CreditCard },
    { name: 'Compliance', href: '/profile/compliance', icon: ShieldCheck },
];
