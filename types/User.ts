export interface User {
    id: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    is_active: boolean;
    is_social_network_user: boolean;
    is_superuser: boolean;
    hashed_password: boolean;
    stripe_id: string;
    bitrix_id: string;
    created_at: string;
    updated_at: string;
}
