import { Camera } from 'lucide-react';
import { UserSettingsAvatarRowProps } from '@/types/Rows';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const UserSettingsAvatarRow = ({
    label = 'Photo',
    url,
    labelClassName = '',
    contentClassName = '',
    children,
    className,
}: UserSettingsAvatarRowProps) => (
    <div className={`p-4 ${className || ''}`}>
        <div className="flex items-baseline gap-2">
            <Label
                className={`text-sm leading-none w-[60%] text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-50 font-medium flex items-center gap-1 max-w-56 ${labelClassName}`}
            >
                {label}
            </Label>
            <div className={`flex items-center text-sm justify-between gap-2 w-full flex-nowrap ${contentClassName}`}>
                <span className="">{children}</span>
                <Avatar className="relative border-2 border-green-500 rounded-full overflow-hidden size-16 cursor-pointer">
                    <AvatarImage alt="avatar" src={url || ''} />
                    <AvatarFallback>V</AvatarFallback>
                    <div className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-black/25 absolute">
                        <Camera className="fill-border opacity-80 w-4 h-4" />
                    </div>
                </Avatar>
            </div>
        </div>
    </div>
);

export default UserSettingsAvatarRow;
