'use client';

import { useEffect, useState } from 'react';
import { updateUser } from '@/api/user/updateUser';
import { toast } from 'sonner';
import { z } from 'zod';
import { User } from '@/types/User';
import CardWrapper from '@/components/ui/card-wrapper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputRow from '@/components/UserProfile/components/InputRow';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import AvatarRow from './components/AvatarRow';
import { DatePicker } from './components/DatePickerComproud';
import YearPicker from './components/YearPicker';
import { COUNTRY_OPTIONS, GENDER_OPTIONS, LANGUAGE_OPTIONS } from './constants/PERSONAL';

const personalInfoSchema = z.object({
    first_name: z.string().max(50, 'First name must be less than 50 characters'),
    last_name: z.string().max(50, 'Last name must be less than 50 characters'),
    gender: z.string().optional(),
    language: z.string().optional(),
    country: z.string().optional(),
    birthday: z.string().optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoCardProps {
    currentUser: User;
}

const PersonalInfoCard = ({ currentUser }: PersonalInfoCardProps) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [prevState, setPrevState] = useState<PersonalInfoFormData | null>(null);
    const [firstName, setFirstName] = useState(currentUser.first_name || '');
    const [lastName, setLastName] = useState(currentUser.last_name || '');
    const [birthday, setBirthday] = useState(
        currentUser.birthday
            ? new Date(currentUser.birthday).toISOString().slice(0, 10)
            : new Date().toISOString().slice(0, 10),
    );
    const [gender, setGender] = useState(currentUser.gender || '');
    const [country, setCountry] = useState(currentUser.country || '');
    const [language, setLanguage] = useState(currentUser.language || '');
    const [calendarMonth, setCalendarMonth] = useState(birthday ? new Date(birthday) : new Date());

    useEffect(() => {
        if (birthday) {
            setCalendarMonth(new Date(birthday));
        }
    }, [birthday]);

    const handleSave = async () => {
        const previous = {
            first_name: firstName,
            last_name: lastName,
            gender,
            language,
            country,
            birthday,
        };
        setPrevState(previous);

        try {
            setIsProcessing(true);

            const formData: PersonalInfoFormData = {
                first_name: firstName,
                last_name: lastName,
                gender,
                language,
                country,
                birthday,
            };

            const validatedData = personalInfoSchema.parse(formData);

            const response = await updateUser({
                ...validatedData,
                email: currentUser.email,
            });

            if (!response?.success) {
                throw new Error(response?.error || 'Failed to update user information');
            }
            toast.success('User information updated successfully');
        } catch (err) {
            if (prevState) {
                setFirstName(prevState.first_name);
                setLastName(prevState.last_name);
                setGender(prevState.gender || '');
                setLanguage(prevState.language || '');
                setCountry(prevState.country || '');
                setBirthday(prevState.birthday || new Date().toISOString().slice(0, 10));
            }
            let errorMessage = 'An unexpected error occurred';
            if (err instanceof z.ZodError) {
                errorMessage = err.errors[0].message;
            } else if (err instanceof Error) {
                errorMessage = err.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <CardWrapper title="Personal Information">
            <AvatarRow label="Photo">150x150px JPEG, PNG Image</AvatarRow>
            <InputRow label="First Name" value={firstName} id="first_name" onChange={setFirstName} />
            <InputRow label="Last Name" value={lastName} id="last_name" onChange={setLastName} />
            <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 p-4">
                <DatePicker.Label className="flex w-full max-w-56">Birthday</DatePicker.Label>
                <div className="flex w-full">
                    <DatePicker
                        value={new Date(birthday)}
                        onChange={(date) =>
                            setBirthday(
                                date
                                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                                    : new Date().toISOString().slice(0, 10),
                            )
                        }
                    >
                        <DatePicker.Trigger placeholder="Pick a date" formatString="MMM dd yyyy" />
                        <DatePicker.Content>
                            <div className="flex flex-col lg:flex-row">
                                <div className="p-2 pr-0">
                                    <Calendar
                                        mode="single"
                                        selected={birthday ? new Date(birthday) : undefined}
                                        month={calendarMonth}
                                        onMonthChange={setCalendarMonth}
                                        onSelect={(date) => {
                                            setBirthday(
                                                date
                                                    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
                                                    : new Date().toISOString().slice(0, 10),
                                            );
                                        }}
                                        required={false}
                                    />
                                </div>
                                <div className="pl-0 p-2">
                                    <YearPicker
                                        value={birthday ? new Date(birthday).getFullYear().toString() : undefined}
                                        onChange={(year) => {
                                            if (!birthday) return;
                                            const date = new Date(birthday);
                                            date.setFullYear(Number(year));
                                            setBirthday(date.toISOString().slice(0, 10));
                                        }}
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
            <InputRow label="Country" value={country} id="country" onChange={setCountry}>
                <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                        {COUNTRY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </InputRow>
            <div className="flex justify-end">
                <Button className="py-2 px-4 my-4 mr-4" disabled={isProcessing} onClick={handleSave}>
                    {isProcessing ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </CardWrapper>
    );
};

export default PersonalInfoCard;
