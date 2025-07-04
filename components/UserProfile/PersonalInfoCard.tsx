import { User } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import CardWrapper from '../ui/card-wrapper';
import Row from './Row';

interface PersonalInfoCardProps {
    currentUser: User;
}

const PersonalInfoCard = ({ currentUser }: PersonalInfoCardProps) => {
    const rows = [
        {
            label: 'Photo',
            value: '150x150px JPEG, PNG Image',
            actionIcon: (
                <Avatar className="size-12 border-2 rounded-full border-green-500">
                    <AvatarImage src="" />
                    <AvatarFallback>V</AvatarFallback>
                </Avatar>
            ),
        },
        { label: 'First Name', value: currentUser.first_name },
        { label: 'Last Name', value: currentUser.last_name },
        { label: 'Birthday', value: '28 May 1996' },
        { label: 'Gender', value: 'Male' },
        { label: 'Address', value: 'Kyiv, Ukraine' },
    ];

    return (
        <CardWrapper title="Personal Info">
            {rows.map((item) => (
                <Row key={item.label} label={item.label} actionIcon={item.actionIcon}>
                    {item.value}
                </Row>
            ))}
        </CardWrapper>
    );
};

export default PersonalInfoCard;
