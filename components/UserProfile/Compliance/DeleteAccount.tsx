'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DeleteAccountDialog from './DeleteAccountDialog';

const DeleteAccount = () => {
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

    return (
        <>
            <div className="p-4">
                <p className="text-sm text-foreground my-4">
                    We regret to see you leave. Confirm account deletion below. Your data will be permanently removed.
                    Thank you for being part of our community.
                </p>
                <div className="flex justify-end gap-2">
                    <Button className="my-4" variant="outline">
                        Deactivate instead
                    </Button>
                    <Button
                        className="my-4 transition-all duration-300"
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
            />
        </>
    );
};

export default DeleteAccount;
