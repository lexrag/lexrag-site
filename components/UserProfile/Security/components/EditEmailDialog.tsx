import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ReusableDialog from '@/components/common/ReusableDialog';

interface EditEmailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (newEmail: string) => void;
    loading: boolean;
    currentEmail: string;
    error?: string;
}

const EditEmailDialog = ({ open, onOpenChange, onSave, loading, currentEmail, error }: EditEmailDialogProps) => {
    const [email, setEmail] = useState(currentEmail);

    useEffect(() => {
        if (open) setEmail(currentEmail);
    }, [open, currentEmail]);

    const handleSave = () => {
        if (email && email !== currentEmail) {
            onSave(email);
        }
    };

    return (
        <ReusableDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Edit Email"
            contentClassName=""
            footer={
                <>
                    <Button variant="outline" disabled={loading} onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        disabled={loading || !email || email === currentEmail}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </Button>
                </>
            }
        >
            <div className="mb-2 text-sm text-mono">
                Current email: <span className="font-medium">{currentEmail}</span>
            </div>
            <Input
                type="email"
                className="w-full border rounded px-3 py-2 mb-2 text-mono"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
            {error && <div className="text-destructive text-sm mb-2">{error}</div>}
        </ReusableDialog>
    );
};

export default EditEmailDialog;
