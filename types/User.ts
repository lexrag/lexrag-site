export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    is_active: boolean;
    is_social_network_user: boolean;
    signup_source: string;
    country: string;
    language: string;
    birthday: string;
    gender: string;
    password_last_changed_at: string;
    created_at: string;
    updated_at: string;
    notifications: NotificationMethod;
}

export interface UpdateUserParams {
    first_name: string;
    last_name: string;
    phone_number?: string;
    email: string;
    birthday?: string;
    gender?: string;
    language?: string;
    country?: string;
}

export type NotificationMethod = "email" | "sms" | "push";