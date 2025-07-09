import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface TurnOfNotificationsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onTurnOff: () => void;
    loading: boolean;
}

const TurnOfNotificationsDialog = ({ open, onOpenChange, onTurnOff, loading }: TurnOfNotificationsModalProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Turn off notifications</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to turn off notifications? You will not receive any notifications from us.
                </DialogDescription>
            </DialogContent>
            <DialogFooter>
                <Button onClick={onTurnOff} disabled={loading}>
                    {loading ? 'Turning off...' : 'Turn off'}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default TurnOfNotificationsDialog;
