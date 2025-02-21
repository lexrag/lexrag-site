export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    is_active: boolean;
    is_social_network_user: boolean;
    is_superuser: boolean;
    hashed_password: boolean;
    stripe_id: string;
    bitrix_id: string;
    created_at: string;
    updated_at: string;
}
