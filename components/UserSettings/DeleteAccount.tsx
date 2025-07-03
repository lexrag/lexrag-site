'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import CardWrapper from '../ui/card-wrapper';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

const DeleteAccount = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <CardWrapper title="Delete Account">
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
                    <Button className="py-2 px-4 my-4" variant="outline">
                        Deactivate instead
                    </Button>
                    <Button
                        className="py-2 px-4 my-4 transition-all duration-300"
                        disabled={!isChecked}
                        variant="destructive"
                    >
                        Delete Account
                    </Button>
                </div>
            </div>
        </CardWrapper>
    );
};

export default DeleteAccount;
