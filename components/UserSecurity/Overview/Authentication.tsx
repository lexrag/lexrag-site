'use client';

import { useState } from 'react';
import { getGoogleAuthLink } from '@/api/auth/getGoogleAuthLink';
import { getLinkedinAuthLink } from '@/api/auth/getLinkedinAuthLink';
import { FaRegEdit } from 'react-icons/fa';
import PasswordResetModal from '@/components/UserSettings/PasswordResetModal';
import { Icons } from '../../common/icons';
import CardWrapper from '../../ui/card-wrapper';
import Row from '../../UserProfile/Row';

const Authentication = () => {
    const [resetOpen, setResetOpen] = useState(false);

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
        <CardWrapper title="Authentication">
            <Row
                label="Password"
                actionIcon={
                    <button
                        type="button"
                        className="flex items-center justify-center text-gray-500 hover:text-primary cursor-pointer"
                        onClick={() => setResetOpen(true)}
                        aria-label="Reset Password"
                    >
                        <FaRegEdit />
                    </button>
                }
            >
                <span>Password last changed 2 months ago</span>
                <PasswordResetModal open={resetOpen} onOpenChange={setResetOpen} />
            </Row>
            <Row label="2FA" actionIcon={<FaRegEdit />}>
                <span>Not set</span>
            </Row>
            <Row label="Sign in" actionIcon={<FaRegEdit />}>
                <div className="flex items-center gap-2">
                    <Icons.googleColorful
                        className="hover:text-primary size-5 cursor-pointer"
                        onClick={handleGoogleAuth}
                    />
                    <Icons.linkedinColorfull
                        className="hover:text-primary size-5 cursor-pointer"
                        onClick={handleLinkedinAuth}
                    />
                </div>
            </Row>
        </CardWrapper>
    );
};

export default Authentication;
