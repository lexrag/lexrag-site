import Header from '@/components/Header/Header';

type GeneralLayoutProps = {
    children: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-col min-h-screen ">
                <Header />

                <main className="flex-grow mt-20">{children}</main>
            </div>
        </div>
    );
};

export default GeneralLayout;
