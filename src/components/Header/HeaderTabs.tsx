"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const HeaderTabs = () => {
    const tabs = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "How It Works", href: "/#how-it-works" },
        { name: "Product Features", href: "/features" },
        { name: "Services", href: "/#services" },
        { name: "Our Clients", href: "/#our_clients" },
        { name: "Company", href: "/#company" },
        { name: "FAQ", href: "/#faq" },
    ];

    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        setActiveTab(pathname);
    }, [pathname]);

    return (
        <header className="flex items-center justify-between w-full h-20">
            <Logo />

            <nav className="flex items-center gap-10 flex-1 justify-center h-full">
                {tabs.map((tab) => {
                    const isActive = activeTab.startsWith(tab.href.replace("/#", ""));

                    return (
                        <Link key={tab.name} href={tab.href} className="h-full flex items-center">
                            <span
                                className={`menu-title font-medium text-sm hover:border-b-2 hover:border-gray-500 focus:text-gray-900 transition-all 
                                ${isActive ? "text-gray-900" : "text-gray-500"}`}
                                onClick={() => setActiveTab(tab.href)}
                            >
                                {tab.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
};

export default HeaderTabs;