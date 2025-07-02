'use client';

import { useState } from 'react';
import { format, setHours, setMinutes } from 'date-fns';
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

const GeneralSettings = ({ currentUser }: GeneralSettingsProps) => {
    const [name, setName] = useState<string>(currentUser.first_name);
    const [lastName, setLastName] = useState<string>(currentUser.last_name);
    const [birthday, setBirthday] = useState<Date>(new Date('1996-05-28'));
    const [availability, setAvailability] = useState<Date>(new Date('2025-07-01T00:00:00Z'));
    const [phoneNumber, setPhoneNumber] = useState<string>(currentUser.phone_number || '');
    const [email, setEmail] = useState<string>(currentUser.email || '');
    const [address, setAddress] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');

    return (
        <CardWrapper title="General Settings">
            <AvatarRow label="Photo" url={''}>
                <span>150x150px JPEG, PNG Image</span>
            </AvatarRow>

            <InputRow label="Name" value={name} id="name" onChange={setName} />
            <InputRow label="Last Name" value={lastName} id="last-name" onChange={setLastName} />

            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 py-2">
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
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 py-2">
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
            <InputRow
                label="Phone Number"
                value={phoneNumber}
                id="phone-number"
                onChange={setPhoneNumber}
                placeholder="Phone number"
            />
            <InputRow label="Email" value={email} id="email" onChange={setEmail} placeholder="Email" />
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
                <Button className="py-2 px-4 my-4">Save Changes</Button>
            </div>
        </CardWrapper>
    );
};

export default GeneralSettings;
