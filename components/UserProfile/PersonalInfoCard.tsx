'use client';

import { useState } from 'react';
import { User } from '@/types/User';
import CardWrapper from '@/components/ui/card-wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputRow from '@/components/UserProfile/components/InputRow';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import AvatarRow from './components/AvatarRow';
import { DatePicker } from './components/DatePickerComproud';
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from './constants/PERSONAL';

interface PersonalInfoCardProps {
    currentUser: User;
}

const PersonalInfoCard = ({ currentUser }: PersonalInfoCardProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [firstName, setFirstName] = useState(currentUser.first_name);
    const [lastName, setLastName] = useState(currentUser.last_name);
    const [birthday, setBirthday] = useState('28 May 1996');
    const [gender, setGender] = useState('Male');
    const [address, setAddress] = useState('Warsaw, Poland');
    const [language, setLanguage] = useState('en');

    return (
        <CardWrapper title="Personal Information">
            <AvatarRow label="Photo" url={''}>
                150x150px JPEG, PNG Image
            </AvatarRow>
            <InputRow label="First Name" value={firstName} id="first_name" onChange={setFirstName} />
            <InputRow label="Last Name" value={lastName} id="last_name" onChange={setLastName} />
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 p-4">
                <DatePicker.Label className="flex w-full max-w-56">Birthday</DatePicker.Label>
                <div className="flex w-full">
                    <DatePicker
                        value={new Date(birthday)}
                        onChange={(date) => setBirthday(date?.toLocaleDateString() || new Date().toLocaleDateString())}
                    >
                        <DatePicker.Trigger placeholder="Pick a date" formatString="MMM dd yyyy" />
                        <DatePicker.Content>
                            <div className="flex flex-col sm:flex-row">
                                <div className="rdp-root p-2 sm:pe-5">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(birthday)}
                                        onSelect={(date) =>
                                            setBirthday(date?.toLocaleDateString() || new Date().toLocaleDateString())
                                        }
                                        required={false}
                                    />
                                </div>
                            </div>
                        </DatePicker.Content>
                    </DatePicker>
                </div>
            </div>
            <InputRow label="Gender" value={gender} id="gender" onChange={setGender}>
                <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                        {GENDER_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </InputRow>
            <InputRow label="Language" value={language} id="language" onChange={setLanguage}>
                <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                        {LANGUAGE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </InputRow>
            <InputRow label="Address" value={address} id="address" onChange={setAddress} />
            <div className="flex justify-end">
                <Button className="py-2 px-4 my-4 mr-4" type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </CardWrapper>
    );
};

export default PersonalInfoCard;
