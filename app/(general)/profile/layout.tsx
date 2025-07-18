import PageTitle from '@/components/Layout/PageTitle';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex flex-col w-full items-center justify-center">
            <PageTitle />
            {children}
        </section>
    );
}
