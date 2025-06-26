import { FaRegEdit } from 'react-icons/fa';
import { MdAddAPhoto } from 'react-icons/md';
import { User } from '@/types/User';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '../ui/card';

interface PersonalInfoCardProps {
    currentUser: User;
}

const PersonalInfoCard = ({ currentUser }: PersonalInfoCardProps) => {
    return (
        <div className="container-flex w-full pl-[15%] pr-[15%]">
            <Card>
                <CardHeader>
                    <CardHeading>
                        <CardTitle>Personal Info</CardTitle>
                    </CardHeading>
                </CardHeader>
                <CardContent className="py-1">
                    <div className="flex items-center justify-between gap-2 py-4 border-b border-dashed last:border-none">
                        <div className="w-[20%] text-sm font-medium">Photo</div>
                        <div className="flex-1 text-sm">150x150px JPEG, PNG Image</div>
                        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer">
                            <Avatar className="size-12">
                                <AvatarImage src={''} alt="Avatar" />
                                <AvatarFallback>
                                    <MdAddAPhoto className="size-4" />
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-4 border-b border-dashed last:border-none">
                        <div className="w-[20%] text-sm font-medium">First Name</div>
                        <div className="flex-1 text-sm">{currentUser.first_name}</div>
                        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer">
                            <FaRegEdit />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-4 border-b border-dashed last:border-none">
                        <div className="w-[20%] text-sm font-medium">Last Name</div>
                        <div className="flex-1 text-sm">{currentUser.last_name}</div>
                        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer">
                            <FaRegEdit />
                        </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 py-4 border-b border-dashed last:border-none">
                        <div className="w-[20%] text-sm font-medium">Email</div>
                        <div className="flex-1 text-sm">{currentUser.email}</div>
                        <div className="w-[10%] flex justify-center text-gray-500 hover:text-primary cursor-pointer">
                            <FaRegEdit />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default PersonalInfoCard;
