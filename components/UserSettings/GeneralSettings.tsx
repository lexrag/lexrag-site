'use client';

import { useState } from 'react';
import { updateUser } from '@/api/auth/updateUser';
import { createAccessToken } from '@/utils/auth/createAccessToken';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, setHours, setMinutes } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { User } from '@/types/User';
import { Calendar } from '@/components/ui/calendar';
import CardWrapper from '@/components/ui/card-wrapper';
import DateSlot from '@/components/ui/date-slot';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AvatarRow from '@/components/UserSettings/AvatarRow';
import InputRow from '@/components/UserSettings/InputRow';
import { Button } from '../ui/button';
import { COUNTRIES } from './constants/countries';
import { DatePicker } from './DatePickerComproud';

interface GeneralSettingsProps {
    currentUser: User;
}

const schema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    phone_number: z.string().optional(),
    email: z.string().email('Please enter a valid email address'),
});
type FormValues = z.infer<typeof schema>;

const GeneralSettings = ({ currentUser }: GeneralSettingsProps) => {
    const [birthday, setBirthday] = useState<Date>(new Date('1996-05-28'));
    const [availability, setAvailability] = useState<Date>(new Date('2025-07-01T00:00:00Z'));
    const [address, setAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            first_name: currentUser.first_name || '',
            last_name: currentUser.last_name || '',
            phone_number: currentUser.phone_number || '',
            email: currentUser.email || '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setSuccess(null);
        setError(null);
        setIsProcessing(true);
        try {
            const response = await updateUser(data);
            if (!response) {
                throw new Error('Failed to update profile');
            }
            if (!response.success) {
                throw new Error(response.error || 'Failed to update profile');
            }
            setSuccess('Profile updated successfully.');
        } catch (err) {
            setError('Failed to update profile.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <CardWrapper title="General Settings">
            <AvatarRow label="Photo" url={''} className="px-4">
                <span>150x150px JPEG, PNG Image</span>
            </AvatarRow>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <InputRow
                    label="Name"
                    value={form.watch('first_name')}
                    id="name"
                    onChange={(v) => form.setValue('first_name', v)}
                />
                {form.formState.errors.first_name && (
                    <div className="text-xs text-red-500 mb-1">{form.formState.errors.first_name.message}</div>
                )}
                <InputRow
                    label="Last Name"
                    value={form.watch('last_name')}
                    id="last-name"
                    onChange={(v) => form.setValue('last_name', v)}
                />
                {form.formState.errors.last_name && (
                    <div className="text-xs text-red-500 mb-1">{form.formState.errors.last_name.message}</div>
                )}
                <InputRow
                    label="Phone Number"
                    value={form.watch('phone_number') || ''}
                    id="phone-number"
                    onChange={(v) => form.setValue('phone_number', v)}
                    placeholder="Phone number"
                />
                {form.formState.errors.phone_number && (
                    <div className="text-xs text-red-500 mb-1">{form.formState.errors.phone_number.message}</div>
                )}
                <InputRow
                    label="Email"
                    value={form.watch('email')}
                    id="email"
                    onChange={(v) => form.setValue('email', v)}
                    placeholder="Email"
                />
                {form.formState.errors.email && (
                    <div className="text-xs text-red-500 mb-1">{form.formState.errors.email.message}</div>
                )}
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 p-4">
                    <DatePicker.Label className="flex w-full max-w-56">Birthday</DatePicker.Label>
                    <div className="flex w-full">
                        <DatePicker value={birthday} onChange={(date) => setBirthday(date || new Date())}>
                            <DatePicker.Trigger placeholder="Pick a date" formatString="MMM dd yyyy" />
                            <DatePicker.Content>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="rdp-root p-2 sm:pe-5">
                                        <Calendar
                                            mode="single"
                                            selected={birthday}
                                            onSelect={(date) => setBirthday(date || new Date())}
                                            required={false}
                                        />
                                    </div>
                                </div>
                            </DatePicker.Content>
                        </DatePicker>
                    </div>
                </div>
                <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 p-4">
                    <DatePicker.Label className="flex w-full max-w-56">Availability</DatePicker.Label>
                    <div className="flex w-full">
                        <DatePicker value={availability} onChange={(date) => setAvailability(date || new Date())}>
                            <DatePicker.Trigger placeholder="Pick a date and time" formatString="MMM dd yyyy HH:mm" />
                            <DatePicker.Content>
                                <div className="flex flex-col sm:flex-row">
                                    <div className="rdp-root p-2 sm:pe-5">
                                        <Calendar
                                            mode="single"
                                            selected={availability}
                                            onSelect={(date) => setAvailability(date || new Date())}
                                            required={false}
                                        />
                                    </div>
                                    <div className="relative w-full max-sm:h-48 sm:w-40 border-t sm:border-t-0 sm:border-l border-border">
                                        <DateSlot
                                            selectedSlot={format(availability, 'HH:mm')}
                                            onSelect={(slot) =>
                                                setAvailability(
                                                    setHours(
                                                        setMinutes(availability, Number(slot.split(':')[1])),
                                                        Number(slot.split(':')[0]),
                                                    ),
                                                )
                                            }
                                            dayLabel={format(availability, 'EEEE, dd')}
                                            disabledSlots={[]}
                                        />
                                    </div>
                                </div>
                            </DatePicker.Content>
                        </DatePicker>
                    </div>
                </div>
                <InputRow label="Address" value={address} id="address" onChange={setAddress} placeholder="Address" />
                <InputRow label="Country" value={country} id="country" onChange={setCountry} placeholder="Country">
                    <Select>
                        <SelectTrigger className="w-full text-sm h-10 px-3 rounded-md border border-input bg-background shadow-xs flex items-center justify-between">
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent className="w-80 sm:w-auto sm:max-w-md overflow-y-auto rounded-md shadow-lg">
                            {COUNTRIES.map((country) => (
                                <SelectItem
                                    key={country.value}
                                    value={country.value}
                                    className="py-3 px-2 w-full text-sm cursor-pointer hover:bg-accent focus:bg-accent"
                                >
                                    {country.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </InputRow>
                <InputRow label="City" value={city} id="city" onChange={setCity} placeholder="City" />
                <InputRow
                    label="Postcode"
                    value={postalCode}
                    id="postal-code"
                    onChange={setPostalCode}
                    placeholder="Postcode"
                />
                <div className="flex justify-end">
                    <Button className="py-2 px-4 my-4 mr-4" type="submit" disabled={isProcessing}>
                        {isProcessing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
                {success && <div className="mb-2 text-green-600 text-sm font-medium">{success}</div>}
                {error && <div className="mb-2 text-red-600 text-sm font-medium">{error}</div>}
            </form>
        </CardWrapper>
    );
};

export default GeneralSettings;
