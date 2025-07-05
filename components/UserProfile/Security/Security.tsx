'use client';

import { useState } from 'react';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { getLinkedinAuthLink } from '@/api/auth/getLinkedinAuthLink';
import { FaRegEdit } from 'react-icons/fa';
import { User } from '@/types/User';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { Icons } from '@/components/common/icons';
import PasswordResetModal from '@/components/UserProfile/components/PasswordResetModal';
import Row from '@/components/UserProfile/components/Row';
import EditEmailDialog from '@/components/UserProfile/Security/components/EditEmailDialog';

interface AuthenticationProps {
    currentUser: User;
}

const Authentication = ({ currentUser }: AuthenticationProps) => {
    const [resetOpen, setResetOpen] = useState(false);
    const [open, setOpen] = useState(false);

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

    return (
        <CardWrapper title="Security">
            <Row
                label="Email"
                actionIcon={
                    <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Edit Email">
                        <FaRegEdit />
                    </Button>
                }
            >
                <span>{currentUser.email}</span>
            </Row>
            <EditEmailDialog
                open={open}
                onOpenChange={setOpen}
                onSave={() => {}}
                loading={false}
                currentEmail={currentUser.email}
            />
            <Row label="Phone Number" actionIcon={<FaRegEdit />}>
                <span>
                    {currentUser.phone_number || (
                        <Badge variant="warning" appearance="outline">
                            Not set
                        </Badge>
                    )}
                </span>
            </Row>
            <Row label="2FA" actionIcon={<FaRegEdit />}>
                <Badge variant="warning" appearance="outline">
                    Not set
                </Badge>
            </Row>
            <Row label="Sign in" actionIcon={<FaRegEdit />}>
                <div className="flex items-center gap-2">
                    <Icons.googleColorful className="size-5 cursor-pointer" onClick={handleGoogleAuth} />
                    <Icons.linkedinColorfull className="size-5 cursor-pointer" onClick={handleLinkedinAuth} />
                </div>
            </Row>
            <Row
                label="Password"
                actionIcon={
                    <Button variant="ghost" size="icon" onClick={() => setResetOpen(true)} aria-label="Reset Password">
                        <FaRegEdit />
                    </Button>
                }
            >
                <span>Password last changed 2 months ago</span>
                <PasswordResetModal open={resetOpen} onOpenChange={setResetOpen} />
            </Row>
        </CardWrapper>
    );
};

export default Authentication;
