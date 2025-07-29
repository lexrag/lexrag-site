import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ChatMenuItemProps {
    href: string;
    icon: React.ReactElement;
    name: string;
}

export const ChatMenuItem = ({ href, icon, name }: ChatMenuItemProps) => {
    return (
        <div className="px-3 py-0.5">
            <Link
                href={href}
                className={cn(
                    'flex flex-row items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-accent/50 text-default',
                )}
            >
                {icon}
                {name}
            </Link>
        </div>
    );
};
