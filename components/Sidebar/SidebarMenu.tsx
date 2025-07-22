import {
    CreditCard,
    History,
    Home,
    MessageSquare,
    MessageSquarePlus,
    ReceiptText,
    Settings,
    Shield,
    ShieldCheck,
    Sparkles,
    User,
} from 'lucide-react';
import { SidebarMenuGroup } from './SidebarMenuGroup';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarThemeSwitch } from './SidebarThemeSwitch';

export function SidebarMenu() {
    return (
        <nav className="px-2 pb-2">
            <ul className="flex flex-col gap-2">
                <SidebarMenuGroup label="Home">
                    <SidebarMenuItem href="/" Icon={Home} label="Home" />
                    <SidebarMenuItem href="/features" Icon={Sparkles} label="Features" />
                    <SidebarMenuItem href="/chat/new" Icon={MessageSquare} label="Chat" />
                </SidebarMenuGroup>
                <SidebarMenuGroup label="Profile">
                    <SidebarMenuItem href="/profile" Icon={User} label="Profile" />
                    <SidebarMenuItem href="/profile/security" Icon={Shield} label="Security" />
                    <SidebarMenuItem href="/profile/security/sessions" Icon={History} label="Sessions" />
                    <SidebarMenuItem href="/profile/compliance" Icon={ShieldCheck} label="Compliance" />
                </SidebarMenuGroup>
                <SidebarMenuGroup label="Invoices">
                    <SidebarMenuItem href="/profile/billing" Icon={CreditCard} label="Billing" />
                    <SidebarMenuItem href="/profile/billing/plans" Icon={ReceiptText} label="Plans" />
                    <SidebarMenuItem href="/profile/billing/history" Icon={History} label="Payments" />
                </SidebarMenuGroup>
                <SidebarMenuGroup label="Settings">
                    <SidebarMenuItem href="/profile/settings" Icon={Settings} label="Settings" />
                    <SidebarThemeSwitch />
                </SidebarMenuGroup>
            </ul>
        </nav>
    );
}
