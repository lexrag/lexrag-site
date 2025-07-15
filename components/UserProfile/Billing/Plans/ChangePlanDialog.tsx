'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ChangePlanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    loading: boolean;
}

const ChangePlanDialog = ({ open, onOpenChange, onConfirm, loading }: ChangePlanDialogProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-xs sm:max-w-sm sm:mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Are you sure you want to change your plan?
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        After confirmation, you will be redirected to pay for the new plan.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Checkbox id="change-plan" checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <Label htmlFor="change-plan">Confirm changing my plan</Label>
                </div>
                <DialogFooter className="flex-row gap-2 justify-end">
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={loading || !isChecked}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {loading ? 'Changing...' : 'Confirm'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChangePlanDialog;
