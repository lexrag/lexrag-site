'use client';

import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const HeaderCornerMenu = () => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
                <div className="h-[40%] border-r-2 border-gray-200" />
                <div className="tab">
                    <Button 
                        variant="outline" 
                        className="flex items-center gap-2"
                        onClick={() => window.open('https://app.lexrag.com', '_blank')}
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
