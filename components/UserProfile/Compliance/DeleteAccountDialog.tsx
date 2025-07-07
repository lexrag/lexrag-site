import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
    loading: boolean;
}

const DeleteAccountDialog = ({ open, onOpenChange, onDelete, loading }: DeleteAccountDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-xs sm:max-w-sm sm:mx-auto">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground mb-4">
                    This action is irreversible. All your data will be permanently deleted.
                </div>
                <DialogFooter className="flex-row gap-2 justify-end">
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={loading}
                        className="bg-destructive hover:bg-destructive/90"
                    >
                        {loading ? 'Deleting...' : 'Delete Account'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;
