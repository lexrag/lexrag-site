import { deleteAccount } from '@/api/user/deleteAccount';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useLogOut } from '@/hooks/use-log-out';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getPasswordSchema } from '@/app/auth/forms/password-schema';

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const schema = z.object({
    password: getPasswordSchema(6),
});

type FormValues = z.infer<typeof schema>;

const DeleteAccountDialog = ({ open, onOpenChange }: DeleteAccountDialogProps) => {
    const logout = useLogOut();
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { password: '' },
        mode: 'onChange',
    });
    const { isSubmitting, isValid } = form.formState;

    const handleDelete = async (values: FormValues) => {
        const response = await deleteAccount(values.password);
        if (response.success) {
            toast.success('Account deleted successfully');
            logout();
            onOpenChange(false);
        } else {
            toast.error(response.error || 'Failed to delete account');
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-xs sm:max-w-sm sm:mx-auto">
                <DialogHeader className="mt-2">
                    <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-muted-foreground mb-4">
                    This action is irreversible. All your data will be permanently deleted.
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleDelete)} className="flex flex-col my-4 max-w-xs">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="delete-password">Enter your password to confirm</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="delete-password"
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Password"
                                            disabled={isSubmitting}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="flex-row gap-2 justify-end mt-2">
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSubmitting}
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={isSubmitting || !isValid}
                                className="bg-destructive hover:bg-destructive/90"
                            >
                                {isSubmitting ? 'Deleting...' : 'Delete Account'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteAccountDialog;
