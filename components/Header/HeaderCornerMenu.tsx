'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { getAppUrl } from '@/lib/app-config';
import { track } from '@/lib/analytics';

const HeaderCornerMenu = () => {
    const handleGoToApp = () => {
        // Track the click event
        track('go_to_app_clicked', {
            source: 'header_corner_menu',
            app_url: getAppUrl(),
        });
        
        // Open app in new tab
        window.open(getAppUrl(), '_blank');
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="h-[40%] border-r-2 border-gray-200" />
                <div className="tab">
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={handleGoToApp}
                    >
                        Go to App
                        <ExternalLink className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeaderCornerMenu;
