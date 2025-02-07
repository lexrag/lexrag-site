"use client"

import { useState } from "react";

const HeaderTabs = () => {
    const tabs = ["Contexts", "Blog", "News", "Pricing", "Contacts"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex items-center gap-10">
            <img className="max-h-[25px] mr-5" src="/media/lexrag-logo.svg" alt="lexrag logo" />
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`tab pb-2 pt-2 text-sm hover:text-gray-900 focus:text-gray-900 
                    ${activeTab === tab ? "text-gray-900 border-gray-400" : "text-gray-500 border-transparent"}`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default HeaderTabs;
