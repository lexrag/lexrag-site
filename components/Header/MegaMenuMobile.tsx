'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function MegaMenuMobile() {
    const pathname = usePathname();

    return (
        <div className="space-y-1">
            <div className="gap-px">
                <div className="uppercase text-xs font-medium text-muted-foreground/70 pt-2.25 pb-px">Navigation</div>
                <div className="space-y-1">
                    <Link
                        href="/"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname === '/' ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Home
                    </Link>
                    <Link
                        href="/features"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/features') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Features
                    </Link>
                    <Link
                        href="/services"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/services') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Services
                    </Link>
                    <Link
                        href="/technology/graphrag"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/technology') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Technology
                    </Link>
                    <Link
                        href="/company"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/company') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Company
                    </Link>
                    <Link
                        href="/use-cases"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/use-cases') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        Use Cases
                    </Link>
                    <Link
                        href="/faq"
                        className={cn(
                            'h-8 hover:bg-transparent text-accent-foreground hover:text-primary data-[selected=true]:text-primary data-[selected=true]:bg-muted data-[selected=true]:font-medium block px-3 py-1',
                            pathname.startsWith('/faq') ? 'text-primary bg-muted font-medium' : '',
                        )}
                    >
                        FAQ
                    </Link>
                </div>
            </div>
        </div>
    );
}
