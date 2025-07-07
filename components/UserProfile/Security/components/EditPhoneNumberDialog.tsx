'use client';

import { useEffect, useState } from 'react';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

interface EditPhoneNumberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (newPhoneNumber: string, rollback?: () => void) => void;
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
    const [prevPhoneNumber, setPrevPhoneNumber] = useState(currentPhoneNumber);
    const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
    useEffect(() => {
        if (open) setPhoneNumber(currentPhoneNumber);
    }, [open, currentPhoneNumber]);

    const handleSave = async () => {
        const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
        if (!isValidPhoneNumber(formattedNumber)) {
            toast.error('Please enter a valid phone number');
            return;
        }
        setPrevPhoneNumber(phoneNumber);
        setPhoneNumber(formattedNumber);
        try {
            onSave(formattedNumber, () => setPhoneNumber(prevPhoneNumber));
            toast.success('Phone number updated successfully');
        } catch (error) {
            setPhoneNumber(prevPhoneNumber);
            toast.error('Failed to update phone number');
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
