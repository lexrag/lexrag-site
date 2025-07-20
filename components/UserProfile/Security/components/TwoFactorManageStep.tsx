import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { TwoFactorManageStepProps } from '@/types/TwoFactor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const TwoFactorManageStepComponent: React.FC<TwoFactorManageStepProps> = ({
    manageStep,
    setManageStep,
    confirmDisable,
    setConfirmDisable,
    confirmDelete,
    setConfirmDelete,
    loading,
    handleDisable2FA,
    handleDelete2FA,
}) => {
    if (manageStep === 'main') {
        return (
            <div className="flex flex-col gap-2 items-center">
                <div className="text-success font-bold text-2xl mb-2">2FA is enabled!</div>
                <p className="text-muted-foreground text-center max-w-xs mb-2">
                    Your account is protected with an extra layer of security.
                </p>
                <Button variant="outline" className="w-full" onClick={() => setManageStep('disable')}>
                    Disable 2FA
                </Button>
                <Button variant="destructive" className="w-full" onClick={() => setManageStep('delete')}>
                    Delete 2FA
                </Button>
            </div>
        );
    }
    if (manageStep === 'disable') {
        return (
            <div className="flex flex-col gap-2 items-center">
                <AlertTriangle className="w-14 h-14 text-warning mb-2" />
                <div className="text-warning font-bold text-xl mb-2">Disable 2FA?</div>
                <p className="text-muted-foreground text-center max-w-xs mb-2">
                    Are you sure you want to disable 2FA? This will reduce your account security.
                </p>
                <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                        id="confirm-disable"
                        checked={confirmDisable}
                        onCheckedChange={(v) => setConfirmDisable(!!v)}
                    />
                    <label htmlFor="confirm-disable" className="text-xs">
                        I understand disabling 2FA will reduce my account security.
                    </label>
                </div>
                <div className="flex gap-2 w-full">
                    <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => {
                            setManageStep('main');
                            setConfirmDisable(false);
                        }}
                        disabled={loading}
                    >
                        Back
                    </Button>
                    <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={handleDisable2FA}
                        disabled={!confirmDisable || loading}
                    >
                        {loading ? 'Disabling...' : 'Disable 2FA'}
                    </Button>
                </div>
            </div>
        );
    }
    if (manageStep === 'delete') {
        return (
            <div className="flex flex-col gap-2 items-center">
                <AlertTriangle className="w-14 h-14 text-destructive mb-2" />
                <div className="text-destructive font-bold text-xl mb-2">Delete 2FA?</div>
                <p className="text-muted-foreground text-center max-w-xs mb-2">
                    Are you sure you want to delete 2FA? This cannot be undone.
                </p>
                <div className="flex items-center gap-2 mb-2">
                    <Checkbox
                        id="confirm-delete"
                        checked={confirmDelete}
                        onCheckedChange={(v) => setConfirmDelete(!!v)}
                    />
                    <label htmlFor="confirm-delete" className="text-xs">
                        I understand deleting 2FA is irreversible.
                    </label>
                </div>
                <div className="flex gap-2 w-full">
                    <Button
                        variant="outline"
                        className="w-1/2"
                        onClick={() => {
                            setManageStep('main');
                            setConfirmDelete(false);
                        }}
                        disabled={loading}
                    >
                        Back
                    </Button>
                    <Button
                        variant="destructive"
                        className="w-1/2"
                        onClick={handleDelete2FA}
                        disabled={!confirmDelete || loading}
                    >
                        {loading ? 'Deleting...' : 'Delete 2FA'}
                    </Button>
                </div>
            </div>
        );
    }
    return null;
};

export default TwoFactorManageStepComponent;
