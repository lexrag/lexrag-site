import { Camera } from 'lucide-react';
import { AvatarRowProps } from '@/types/Rows';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const AvatarRow = ({
    label = 'Photo',
    url,
    labelClassName = '',
    contentClassName = '',
    children,
    className,
}: AvatarRowProps) => (
    <div className={`p-4 ${className || ''}`}>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-7">
            <Label className={`max-w-56 flex-1 ${labelClassName}`}>{label}</Label>
            <div className={`flex items-center justify-between flex-wrap grow ${contentClassName}`}>
                <span className="flex-1 text-sm font-medium text-secondary-foreground">{children}</span>
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

export default AvatarRow;
