'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { tabs } from '@/components/Header/MenuLinks';
import { Logo } from './Logo';

const HeaderTabs = () => {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('');

    const isHomePage = pathname === '/';

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    return (
        <div className="flex items-center justify-between w-full h-20">
            <Logo isHomePage={isHomePage} />

            <nav className="flex items-center gap-10 flex-1 justify-center h-full">
                {tabs.map((tab) => {
                    const isActive = activeTab.startsWith(tab.href.replace('/#', ''));

                    return (
                        <Link key={tab.name} href={tab.href} className="h-full flex items-center">
                            <span
                                className={`menu-title font-medium text-sm hover:border-b-2 hover:border-gray-500 focus:text-gray-900 transition-all 
                                ${isActive ? 'text-gray-900' : 'text-gray-500'}`}
                                onClick={() => setActiveTab(tab.href)}
                            >
                                {tab.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default HeaderTabs;
