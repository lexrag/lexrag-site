'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { MessageSquare, Settings, User } from 'lucide-react';

// Example of using the universal Sidebar
export function SidebarExample() {
    const [activeTab, setActiveTab] = React.useState('chats');

    const header = (
        <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Application</h2>
        </div>
    );

    const menu = (
        <div className="p-4">
            <div className="space-y-2">
                <div 
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        activeTab === 'chats' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab('chats')}
                >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chats</span>
                </div>
                <div 
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        activeTab === 'settings' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab('settings')}
                >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                </div>
                <div 
                    className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        activeTab === 'profile' ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'
                    }`}
                    onClick={() => setActiveTab('profile')}
                >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="p-4 border-t">
            <p className="text-sm text-muted-foreground">© 2024 App</p>
        </div>
    );

    return (
        <Sidebar
            header={header}
            menu={menu}
            footer={footer}
            width="w-64"
            zIndex="z-20"
        />
    );
} 