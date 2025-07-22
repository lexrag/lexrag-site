import ContactSupport from '@/components/UserProfile/Security/Sessions/ContactSupport';
import Questions from '@/components/UserProfile/Security/Sessions/Questions';
import SessionsTable from '@/components/UserProfile/Security/Sessions/SessionsTable';

const SessionsPage = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-background w-full">
            <div className="flex flex-col w-full gap-8 items-center justify-center md:justify-start">
                <div className="max-w-5xl w-full flex flex-col gap-8">
                    <SessionsTable />
                    <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5 w-full">
                        <Questions />
                        <ContactSupport />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SessionsPage;
