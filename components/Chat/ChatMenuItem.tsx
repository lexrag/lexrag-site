import Link from 'next/link';

export const ChatMenuItem = ({ href, icon, name }: { href: string; icon: React.ReactElement; name: string }) => (
    <div className="px-3">
        <Link href={href} className="flex flex-row gap-2 w-full hover:bg-muted rounded-md py-2 px-2">
            {icon}
            {name}
        </Link>
    </div>
);
