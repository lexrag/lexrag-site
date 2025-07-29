type GeneralLayoutProps = {
    children: React.ReactNode;
};

const GeneralLayout = ({ children }: GeneralLayoutProps) => {
    return (
        <div className="w-full">
            <div className="flex flex-col min-h-screen ">
                <main className="flex-grow">{children}</main>
            </div>
        </div>
    );
};

export default GeneralLayout;
