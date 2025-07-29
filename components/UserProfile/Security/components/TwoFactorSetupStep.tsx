import React from 'react';
import QRCode from 'react-qr-code';
import { TwoFactorSetupStepProps } from '@/types/TwoFactor';
import { Button } from '@/components/ui/button';

const TwoFactorSetupStep: React.FC<TwoFactorSetupStepProps> = ({
    setupData,
    loading,
    onNext,
    onBack,
    isBack = false,
    buttonLabel = 'Next',
}) => {
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="text-lg font-semibold text-primary mb-2">Scan QR Code</div>
            <div className="bg-white p-4 rounded shadow mb-2">
                <a
                    href={setupData.opt_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open in authenticator app"
                    className="cursor-pointer inline-block"
                >
                    <QRCode value={setupData.opt_url} size={160} />
                </a>
            </div>
            <div className="text-sm text-secondary-foreground/80 mb-1">Save your recovery passphrase:</div>
            <div className="font-mono text-xs bg-muted p-2 rounded select-all break-all mb-2">
                {setupData.recovery_passphrase}
            </div>
            <div className="flex gap-2 w-full">
                {isBack && onBack && (
                    <Button variant="outline" className="w-1/2" onClick={onBack} disabled={loading}>
                        Back
                    </Button>
                )}
                <Button variant="primary" className={isBack ? 'w-1/2' : 'w-full'} onClick={onNext} disabled={loading}>
                    {buttonLabel}
                </Button>
            </div>
        </div>
    );
};

export default TwoFactorSetupStep;
