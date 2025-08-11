import { setSession } from '@/utils/auth/setSession';

interface LinkedinSignInParams {
    token: string;
}

export const linkedinSignIn = async (params: LinkedinSignInParams): Promise<{ success: boolean; error?: string }> => {
    try {
        const token = params.token;
        localStorage.setItem('token', token);
        await setSession(token);

        return { success: true };
    } catch (e: any) {
        return {
            success: false,
            error: e.message || 'Unexpected error',
        };
    }
};
