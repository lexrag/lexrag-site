import React, { useEffect } from 'react';
import deleteUserDocuments from '@/api/chat/deleteUserDocument';
import { getUserDocuments } from '@/api/chat/getUserDocuments';
import { Trash2 } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { useChatContext } from './ChatProvider';

const UserDocuments = () => {
    const { userDocuments, setUserDocuments, selectedUserDocuments, setSelectedUserDocuments } = useChatContext();

    useEffect(() => {
        (async () => {
            try {
                const result = await getUserDocuments();
                setUserDocuments(result);
            } catch (error) {
                console.error('Failed to fetch user documents:', error);
            }
        })();
    }, [setUserDocuments]); // Empty dependency array is intentional - only run once on mount

    const onDeleteUserDocument = async (uri: string) => {
        await deleteUserDocuments(uri);
        setUserDocuments((prev) => prev.filter((c) => c.uri !== uri));

        setSelectedUserDocuments((prev) => prev.filter((selectedUri) => selectedUri !== uri));
    };

    const handleCheckboxChange = (uri: string, checked: boolean) => {
        if (checked) {
            setSelectedUserDocuments((prev) => [...prev, uri]);
        } else {
            setSelectedUserDocuments((prev) => prev.filter((selectedUri) => selectedUri !== uri));
        }
    };

    return (
        <>
            {userDocuments.map(({ filename, uri }, i) => (
                <div
                    key={i}
                    className={`group flex justify-between items-start gap-2 px-4 py-3 rounded cursor-pointer hover:bg-muted transition-colors`}
                >
                    <Checkbox
                        checked={selectedUserDocuments?.includes(uri) || false}
                        onCheckedChange={(checked) => handleCheckboxChange(uri, checked as boolean)}
                    />
                    <div className="text-sm text-gray-800 dark:text-white flex-1 flex items-start gap-2 min-w-0">
                        <span className="flex-1 min-w-0 break-words leading-relaxed">{filename}</span>
                    </div>
                    <div
                        className="md:hidden block group-hover:block flex-shrink-0"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDeleteUserDocument(uri);
                        }}
                    >
                        <Trash2 size={16} className="text-muted-foreground hover:text-destructive transition" />
                    </div>
                </div>
            ))}
        </>
    );
};

export default UserDocuments;
