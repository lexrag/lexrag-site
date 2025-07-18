'use client';

import { useState } from 'react';
import { updateUserNotifications } from '@/api/user/updateUserNotifications';
import { User } from '@/types/User';
import CardWrapper from '@/components/ui/card-wrapper';
import { Switch } from '@/components/ui/switch';
import Row from './components/Row';

const BasicSettingsCard = ({ currentUser }: { currentUser: User }) => {
    if (!currentUser || typeof currentUser.is_notifications_enabled === 'undefined') {
        return null;
    }
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(currentUser.is_notifications_enabled);
    const [isNotificationsEnabledLoading, setIsNotificationsEnabledLoading] = useState(false);

    const handleNotificationsChange = async (checked: boolean) => {
        setIsNotificationsEnabledLoading(true);
        const response = await updateUserNotifications(checked);
        setIsNotificationsEnabled(checked);
        setIsNotificationsEnabledLoading(false);
    };

    return (
        <CardWrapper title="Other Settings">
            <Row
                label="Marketing Emails"
                actionIcon={
                    <Switch
                        id="marketing-emails"
                        aria-label="Toggle marketing emails"
                        checked={isNotificationsEnabled}
                        onCheckedChange={handleNotificationsChange}
                        disabled={isNotificationsEnabledLoading}
                    />
                }
            >
                <span>Receive updates about new features and promotions</span>
            </Row>
        </CardWrapper>
    );
};

export default BasicSettingsCard;
