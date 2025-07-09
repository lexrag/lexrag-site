'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import DeleteAccountDialog from './DeleteAccountDialog';

const DeleteAccount = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDeleteAccountOpen(false);
        }, 1000);
    };

    return (
        <>
            <div className="p-4">
                <p className="text-sm text-foreground my-4">
                    We regret to see you leave. Confirm account deletion below. Your data will be permanently removed.
                    Thank you for being part of our community.
                </p>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="delete-account"
                        checked={isChecked}
                        onCheckedChange={() => setIsChecked(!isChecked)}
                    />
                    <Label htmlFor="delete-account">Confirm deleting my account</Label>
                </div>
                <div className="flex justify-end gap-2">
                    <Button className="my-4" variant="outline">
                        Deactivate instead
                    </Button>
                    <Button
                        className="my-4 transition-all duration-300"
                        disabled={!isChecked}
                        variant="destructive"
                        onClick={() => setDeleteAccountOpen(true)}
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
            <DeleteAccountDialog
                open={deleteAccountOpen}
                onOpenChange={setDeleteAccountOpen}
                onDelete={handleDelete}
                loading={loading}
            />
        </>
    );
};

export default DeleteAccount;
