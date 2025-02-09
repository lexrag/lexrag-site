"use client"

import { useState } from "react";
import Link from "next/link";

const HeaderTabs = () => {
    const tabs = [
        { name: "Chat", href: "/chat" },
        { name: "Blog", href: "/" },
        { name: "News", href: "/" },
        { name: "Pricing", href: "/" },
        { name: "Contacts", href: "/" }
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    return (
        <div className="flex items-center gap-10">
            <img className="dark:hidden max-h-[20px] mr-5" src="/media/lexrag-logo.svg" alt="lexrag logo" />
            <img className="light:hidden max-h-[20px] mr-5" src="/media/lexrag-logo-dark.svg" alt="lexrag logo" />
            {tabs.map((tab) => (
                <Link key={tab.name} href={tab.href}>
                    <button
                        className={`tab pb-2 pt-2 text-sm hover:text-gray-900 focus:text-gray-900 
                        ${activeTab === tab.name ? "text-gray-900 border-gray-400" : "text-gray-500 border-transparent"}`}
                        onClick={() => setActiveTab(tab.name)}
                    >
                        {tab.name}
                    </button>
                </Link>
            ))}
        </div>
    );
};

export default HeaderTabs;