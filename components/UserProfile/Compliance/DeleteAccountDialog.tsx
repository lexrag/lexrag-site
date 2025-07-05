import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => void;
    loading: boolean;
}

const DeleteAccountDialog = ({ open, onOpenChange, onDelete, loading }: DeleteAccountDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-full max-w-xs sm:max-w-sm sm:mx-auto">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-sm text-muted-foreground mb-4">
                    This action is irreversible. All your data will be permanently deleted.
                </div>
                <AlertDialogFooter className="flex-row gap-2 justify-end">
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <AlertDialogAction asChild>
                        <Button
                            variant="destructive"
                            onClick={onDelete}
                            disabled={loading}
                            className="bg-destructive hover:bg-destructive/90"
                        >
                            {loading ? 'Deleting...' : 'Delete Account'}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteAccountDialog;
