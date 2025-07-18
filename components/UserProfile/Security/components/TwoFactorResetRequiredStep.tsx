import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { TwoFactorResetRequiredStepProps } from '@/types/TwoFactor';
import { Button } from '@/components/ui/button';

const TwoFactorResetRequiredStep: React.FC<TwoFactorResetRequiredStepProps> = ({ loading, onReset, onContinue }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <AlertTriangle className="w-14 h-14 text-warning mb-2" />
        <div className="text-warning font-bold text-xl mb-2">Reset Required</div>
        <p className="text-muted-foreground text-center max-w-xs mb-2">
            Two-factor authentication setup was not completed or was disabled. If you already have the QR code, you can
            continue setup. Otherwise, reset to start over and get a new QR code.
        </p>
        <div className="flex gap-2 w-full mt-2">
            <Button type="button" variant="outline" className="w-1/2" onClick={onContinue} disabled={loading}>
                Continue 2FA Setup
            </Button>
            <Button type="button" variant="destructive" className="w-1/2" onClick={onReset} disabled={loading}>
                Reset 2FA Setup
            </Button>
        </div>
    </div>
);

export default TwoFactorResetRequiredStep;
