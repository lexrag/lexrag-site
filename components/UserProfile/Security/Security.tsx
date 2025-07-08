'use client';

import { useState } from 'react';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { getLinkedinAuthLink } from '@/api/auth/getLinkedinAuthLink';
import { updatePhoneNumber } from '@/api/auth/updatePhoneNumber';
import { formatDistanceToNow } from 'date-fns';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { SquarePen } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/types/User';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { Icons } from '@/components/common/icons';
import ReusableDialog from '@/components/common/ReusableDialog';
import PasswordResetModal from '@/components/UserProfile/components/PasswordResetModal';
import Row from '@/components/UserProfile/components/Row';
import ChangeEmailFlow from '@/components/UserProfile/Security/components/ChangeEmailFlow';
import EditPhoneNumberDialog from '@/components/UserProfile/Security/components/EditPhoneNumberDialog';

interface AuthenticationProps {
    currentUser: User;
}

const Authentication = ({ currentUser }: AuthenticationProps) => {
    const [resetOpen, setResetOpen] = useState(false);
    const [openPhoneNumber, setOpenPhoneNumber] = useState(false);
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone_number || '');
    const [prevPhoneNumber, setPrevPhoneNumber] = useState<string | null>(null);
    const [passwordLastChangedAt, setPasswordLastChangedAt] = useState<string | null>(
        currentUser?.password_last_changed_at || null,
    );
    const [open, setOpen] = useState(false);

    const phoneUtil = PhoneNumberUtil.getInstance();
    const formatted = phoneUtil.format(phoneUtil.parse(phoneNumber), PhoneNumberFormat.INTERNATIONAL);

    const handleGoogleAuth = async () => {
        const res = await getGoogleAuthLink();
        if (res.success) {
            window.location.href = res.redirect_url;
        }
    };
    const handleLinkedinAuth = async () => {
        const res = await getLinkedinAuthLink();
        if (res.success) {
            window.location.href = res.redirect_url;
        }
    };

    const handlePhoneNumberSave = async (newPhoneNumber: string) => {
        setPrevPhoneNumber(phoneNumber);
        setPhoneNumber(newPhoneNumber);
        try {
            setLoading(true);
            const res = await updatePhoneNumber(newPhoneNumber);
            if (res.success) {
                toast.success('Phone number updated');
            } else {
                toast.error('Failed to update phone number');
            }
            setOpenPhoneNumber(false);
        } catch (error) {
            toast.error('Failed to update phone number');
            setPhoneNumber(prevPhoneNumber || '');
            setOpenPhoneNumber(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CardWrapper title="Security">
            <Row
                label="Email"
                actionIcon={
                    <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Edit Email">
                        <SquarePen />
                    </Button>
                }
            >
                <span>{currentUser.email}</span>
            </Row>
            <ReusableDialog
                open={open}
                onOpenChange={setOpen}
                title="Change Email"
                headerClassName="mb-0"
                footer={null}
            >
                <ChangeEmailFlow />
            </ReusableDialog>
            <Row
                label="Phone Number"
                actionIcon={
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpenPhoneNumber(true)}
                        aria-label="Edit Phone Number"
                    >
                        <SquarePen />
                    </Button>
                }
            >
                <span>
                    {phoneNumber ? (
                        formatted
                    ) : (
                        <Badge variant="warning" appearance="outline">
                            Not set
                        </Badge>
                    )}
                </span>
            </Row>
            <Row label="2FA">
                <Badge variant="warning" appearance="outline">
                    Not set
                </Badge>
            </Row>
            <Row label="Sign in">
                <div className="flex items-center gap-2">
                    <Icons.googleColorful className="size-5 cursor-pointer" onClick={handleGoogleAuth} />
                    <Icons.linkedinColorfull className="size-5 cursor-pointer" onClick={handleLinkedinAuth} />
                </div>
            </Row>
            <Row
                label="Password"
                actionIcon={
                    <Button variant="ghost" size="icon" onClick={() => setResetOpen(true)} aria-label="Reset Password">
                        <SquarePen />
                    </Button>
                }
            >
                <span>
                    {passwordLastChangedAt
                        ? `Password last changed ${formatDistanceToNow(new Date(passwordLastChangedAt), { addSuffix: true })}`
                        : 'Password never changed'}
                </span>
                <PasswordResetModal
                    open={resetOpen}
                    onOpenChange={setResetOpen}
                    onSuccess={() => setPasswordLastChangedAt(new Date().toISOString())}
                />
                <EditPhoneNumberDialog
                    open={openPhoneNumber}
                    onOpenChange={setOpenPhoneNumber}
                    onSave={handlePhoneNumberSave}
                    loading={loading}
                    currentPhoneNumber={phoneNumber}
                />
            </Row>
        </CardWrapper>
    );
};

export default Authentication;
