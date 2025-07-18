import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReusableDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
}

const ReusableDialog = ({
    open,
    onOpenChange,
    title,
    children,
    footer,
    className = '',
    headerClassName = '',
    contentClassName = '',
}: ReusableDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className={`w-full max-w-xs sm:max-w-sm sm:mx-auto ${className}`}
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className={headerClassName}>
                    {title ? (
                        <DialogTitle className="text-xl font-medium text-mono mb-2">{title}</DialogTitle>
                    ) : (
                        <DialogTitle aria-hidden="true">&nbsp;</DialogTitle>
                    )}
                </DialogHeader>
                <div className={contentClassName}>{children}</div>
                {footer && <DialogFooter className="flex-row gap-2 justify-end">{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
};

export default ReusableDialog;
