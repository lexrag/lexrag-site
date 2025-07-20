'use client';

import { useState } from 'react';
import { updateUserNotificationsMethod } from '@/api/user/updateUserNotificationsMethod';
import { toast } from 'sonner';
import { NotificationMethod, User } from '@/types/User';
import { CardContent } from '@/components/ui/card';
import CardWrapper from '@/components/ui/card-wrapper';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const NOTIFICATION_METHODS = [
    { key: 'sms', label: 'SMS', description: 'Receive notifications via SMS' },
    { key: 'email', label: 'Email', description: 'Receive notifications via email' },
    { key: 'push', label: 'Push', description: 'Receive notifications via push notifications' },
];

const Nofications = ({ currentUser }: { currentUser: User }) => {
    const [active, setActive] = useState(currentUser.notifications_method);

    const handleChange = async (value: NotificationMethod) => {
        setActive(value);
        const success = await updateUserNotificationsMethod(value);
        if (success) {
            toast.success('Notifications updated successfully');
        } else {
            toast.error('Failed to update notifications');
        }
    };

    return (
        <CardWrapper title="Notifications">
            <RadioGroup
                value={active}
                onValueChange={(value) => handleChange(value as NotificationMethod)}
                className="flex items-center justify-between flex-col gap-0"
                aria-label="Notification Method"
            >
                {NOTIFICATION_METHODS.map((method) => (
                    <CardContent
                        key={method.key}
                        className="flex items-center w-full justify-between border border-border"
                    >
                        <Label htmlFor={method.key} className="text-sm font-normal flex flex-col justify-center ">
                            <span className="leading-none font-medium text-sm text-mono">{method.label}</span>
                            <span className="text-sm text-secondary-foreground">{method.description}</span>
                        </Label>
                        <RadioGroupItem
                            id={method.key}
                            value={method.key}
                            aria-checked={active === method.key}
                            aria-label={method.label}
                        />
                    </CardContent>
                ))}
            </RadioGroup>
        </CardWrapper>
    );
};

export default Nofications;
