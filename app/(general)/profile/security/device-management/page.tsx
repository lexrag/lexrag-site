import PageTitle from '@/components/Layout/PageTitle';
import ContactSupport from '@/components/UserSecurity/DeviceManagement/ContactSupport';
import DevicesTable from '@/components/UserSecurity/DeviceManagement/DevicesTable';
import Questions from '@/components/UserSecurity/DeviceManagement/Questions';

const DeviceManagementPage = () => {
    return (
        <main className="flex flex-col items-center justify-center bg-background w-full px-4 lg:px-6">
            <section className="flex flex-col w-full items-center justify-center">
                <PageTitle />
                <div className="flex flex-col w-full gap-8 items-center justify-center md:justify-start">
                    <div className="max-w-[1320px] w-full mx-auto flex flex-col gap-8">
                        <DevicesTable />
                        <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5 w-full">
                            <Questions />
                            <ContactSupport />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default DeviceManagementPage;
