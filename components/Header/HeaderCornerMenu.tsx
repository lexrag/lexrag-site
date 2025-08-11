'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { getAppUrl } from '@/lib/app-config';
import { trackButtonClick } from '@/lib/analytics-events';

const HeaderCornerMenu = () => {
    const handleGoToApp = () => {
        // Track the button click with marketing context
        trackButtonClick('go_to_app', 'header_corner_menu', {
            app_url: getAppUrl(),
            button_variant: 'outline',
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
