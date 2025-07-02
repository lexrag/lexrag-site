'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import CardWrapper from '../ui/card-wrapper';
import InputRow from './InputRow';

const PasswordReset = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <CardWrapper title="Password Reset">
            <InputRow
                label="Current Password"
                value={oldPassword}
                id="old-password"
                onChange={setOldPassword}
                placeholder="Current Password"
            />
            <InputRow
                label="New Password"
                value={newPassword}
                id="new-password"
                onChange={setNewPassword}
                placeholder="New Password"
            />
            <InputRow
                label="Confirm Password"
                value={confirmPassword}
                id="confirm-password"
                onChange={setConfirmPassword}
                placeholder="Confirm Password"
            />
            <div className="flex justify-end">
                <Button className="py-2 px-4 my-4">Reset Password</Button>
            </div>
        </CardWrapper>
    );
};

export default PasswordReset;
