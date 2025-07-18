import React from 'react';
import { Info } from 'lucide-react';

const TwoFactorLoadingBlock: React.FC = () => (
    <div className="flex flex-col gap-4 items-center pt-12">
        <Info className="w-12 h-12 text-muted-foreground mb-2" />
        <div className="text-secondary text-lg font-semibold">Loading 2FA status...</div>
    </div>
);

export default TwoFactorLoadingBlock;
