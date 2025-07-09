'use client';

import { useEffect, useState } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

interface EditPhoneNumberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (newPhoneNumber: string) => void;
    loading: boolean;
    currentPhoneNumber: string;
}
const EditPhoneNumberDialog = ({
    open,
    onOpenChange,
    onSave,
    loading,
    currentPhoneNumber,
}: EditPhoneNumberDialogProps) => {
    const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);

    useEffect(() => {
        if (open) setPhoneNumber(currentPhoneNumber);
    }, [open, currentPhoneNumber]);

    const handleSave = async () => {
        try {
            const phoneUtil = PhoneNumberUtil.getInstance();
            const parsedNumber = phoneUtil.parse(phoneNumber);
            if (!phoneUtil.isValidNumber(parsedNumber)) {
                toast.error('Please enter a valid phone number');
                return;
            }
        } catch (error) {
            toast.error('Please enter a valid phone number');
            return;
        }
        try {
            onSave(phoneNumber);
        } catch (error) {
            setPhoneNumber(currentPhoneNumber);
        }
    };

    return (
        <ReusableDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Phone Number"
            contentClassName=""
            footer={
                <>
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={loading || !phoneNumber}>
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </>
            }
        >
            <div className="mb-2 text-sm text-mono">
                Current phone number: <span className="font-medium">{currentPhoneNumber}</span>
            </div>
            <div className="w-full">
                <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +1234567890"
                    disabled={loading}
                />
            </div>
        </ReusableDialog>
    );
};

export default EditPhoneNumberDialog;
