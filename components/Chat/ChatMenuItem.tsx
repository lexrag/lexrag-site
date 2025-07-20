import Link from 'next/link';
import { cn } from '@/lib/utils';

export const ChatMenuItem = ({ href, icon, name }: { href: string; icon: React.ReactElement; name: string }) => {
    return (
        <div className="px-3 py-0.5">
            <Link 
                href={href} 
                className={cn(
                    'flex flex-row items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-accent/50 text-base',
                    '[&_svg]:text-muted-foreground hover:[&_svg]:text-primary [&[data-active=true]_svg]:text-primary',
                )}
            >
                {icon}
                {name}
            </Link>
        </div>
    );
};
