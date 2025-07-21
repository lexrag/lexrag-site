'use client';

import { useState } from 'react';
import { updateUserNotifications } from '@/api/user/updateUserNotifications';
import { useUser } from '@/providers/user-provider';
import CardWrapper from '@/components/ui/card-wrapper';
import { Switch } from '@/components/ui/switch';
import Row from './components/Row';

const BasicSettingsCard = () => {
    const { user } = useUser();
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(user?.is_notifications_enabled ?? false);
    const [isNotificationsEnabledLoading, setIsNotificationsEnabledLoading] = useState(false);
    if (!user || typeof user.is_notifications_enabled === 'undefined') {
        return null;
    }

    const handleNotificationsChange = async (checked: boolean) => {
        setIsNotificationsEnabledLoading(true);
        await updateUserNotifications(checked);
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
