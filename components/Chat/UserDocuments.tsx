import React, { useEffect } from 'react';
import deleteUserDocuments from '@/api/chat/deleteUserDocument';
import { getUserDocuments } from '@/api/chat/getUserDocuments';
import { Trash2 } from 'lucide-react';
import { useChatContext } from './ChatProvider';

const UserDocuments = () => {
    const { userDocuments, setUserDocuments } = useChatContext();

    useEffect(() => {
        (async () => {
            try {
                const result = await getUserDocuments();
                setUserDocuments(result);
            } catch (error) {
                console.error('Failed to fetch user documents:', error);
            }
        })();
    }, []);

    const onDeleteUserDocument = async (uri: string) => {
        await deleteUserDocuments(uri);
        setUserDocuments((prev) => prev.filter((c) => c.uri !== uri));
    };

    return (
        <>
            {userDocuments.map(({ filename, uri }, i) => (
                <div
                    key={i}
                    className={`group flex justify-between items-start px-4 py-3 rounded cursor-pointer hover:bg-muted transition-colors`}
                >
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
