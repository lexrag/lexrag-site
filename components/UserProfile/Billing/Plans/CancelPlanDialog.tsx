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

interface CancelPlanDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onCancel: () => void;
    loading: boolean;
}

const CancelPlanDialog = ({ open, onOpenChange, onCancel, loading }: CancelPlanDialogProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-xs sm:max-w-sm sm:mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Are you sure you want to cancel your plan?
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        This action is irreversible. You will lose access to premium features immediately upon
                        cancellation.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <Checkbox id="cancel-plan" checked={isChecked} onCheckedChange={() => setIsChecked(!isChecked)} />
                    <Label htmlFor="cancel-plan">Confirm cancelling my plan</Label>
                </div>
                <DialogFooter className="flex-row gap-2 justify-end">
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Keep Plan
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onCancel}
                        disabled={loading || !isChecked}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {loading ? 'Cancelling...' : 'Cancel Plan'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CancelPlanDialog;
