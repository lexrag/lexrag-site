import { useEffect, useRef, useState } from 'react';
import { downloadUserPhoto } from '@/api/userPhoto/downloadUserPhoto';
import { updateUserPhoto } from '@/api/userPhoto/updateUserPhoto';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { AvatarRowProps } from '@/types/Rows';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

const AvatarRow = ({
    label = 'Photo',
    labelClassName = '',
    contentClassName = '',
    children,
    className,
    onUpload,
    userId,
    userName,
}: AvatarRowProps & { userId?: string; userName?: string }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
    const [isUploading, setIsUploading] = useState(false);

    const avatarKey = userId ? `avatarImage_${userId}` : 'avatarImage';

    const getInitials = () => {
        if (userName) {
            return userName.charAt(0).toUpperCase();
        }
        return '?';
    };

    useEffect(() => {
        const savedAvatar = localStorage.getItem(avatarKey);
        if (savedAvatar) {
            setAvatarUrl(savedAvatar);
        } else {
            setAvatarUrl(undefined);
        }
    }, [avatarKey]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsUploading(true);
        try {
            const localUrl = URL.createObjectURL(file);
            setAvatarUrl(localUrl);

            const formData = new FormData();
            formData.append('file', file);

            const response = await updateUserPhoto(formData);
            if (!response?.success) throw new Error('Failed to upload image');
            if (onUpload) onUpload(response.data.file_url);
            toast.success('Profile photo updated!');
            await saveAvatarToLocalStorage();
        } catch (err) {
            setAvatarUrl(undefined);
            toast.error((err as Error).message || 'Failed to upload image');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const saveAvatarToLocalStorage = async () => {
        const result = await downloadUserPhoto();
        if (result?.success && result.data) {
            try {
                const blob = result.data;
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result as string;
                    localStorage.setItem(avatarKey, base64data);
                    setAvatarUrl(base64data);
                };
                reader.readAsDataURL(blob);
            } catch {
                toast.error('Failed to save avatar to localStorage');
            }
        } else {
            toast.error('Failed to download avatar');
        }
    };

    return (
        <div className={`p-4 ${className || ''}`}>
            <div className="flex items-center flex-wrap lg:flex-nowrap gap-7">
                <Label className={`max-w-56 flex-1 ${labelClassName}`}>{label}</Label>
                <div className={`flex items-center justify-between flex-wrap grow ${contentClassName}`}>
                    <span className="flex-1 text-sm font-medium text-secondary-foreground">{children}</span>
                    <div className="relative">
                        <Avatar
                            className="relative border-2 border-green-500 rounded-full overflow-hidden size-16 cursor-pointer"
                            onClick={handleAvatarClick}
                        >
                            <AvatarImage alt="avatar" src={avatarUrl || undefined} />
                            <AvatarFallback>{getInitials()}</AvatarFallback>
                            <div className="flex items-center justify-center cursor-pointer h-5 left-0 right-0 bottom-0 bg-black/25 absolute">
                                {isUploading ? (
                                    <Loader2 className="animate-spin text-muted-foreground w-4 h-4" />
                                ) : (
                                    <Camera className="fill-border opacity-80 w-4 h-4" />
                                )}
                            </div>
                        </Avatar>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AvatarRow;
