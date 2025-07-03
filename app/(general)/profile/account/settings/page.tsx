import getMeServer from '@/api/auth/getMeServer';
import { User } from '@/types/User';
import PageTitle from '@/components/Layout/PageTitle';
import DeleteAccount from '@/components/UserSettings/DeleteAccount';
import GeneralSettings from '@/components/UserSettings/GeneralSettings';
import PasswordChange from '@/components/UserSettings/PasswordReset';

export default async function SettingsPage() {
    const currentUser: User = await getMeServer();

    return (
        <section className="flex flex-col items-center justify-center bg-background">
            <PageTitle />
            {currentUser && (
                <div className="flex flex-col w-full max-w-3xl gap-8 items-center justify-center px-4">
                    <GeneralSettings currentUser={currentUser} />
                    <PasswordChange />
                    <DeleteAccount />
                </div>
            )}
        </section>
    );
}
