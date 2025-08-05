'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import deleteConversation from '@/api/chat/deleteConversation';
import renameConversation from '@/api/chat/renameConversation';
import { Loader2, Trash2 } from 'lucide-react';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { useChatContext } from './ChatProvider';

interface ChatItemProps {
    thread_id: string;
    title: string;
    isGenerating?: boolean;
    isTitleGenerating?: boolean;
}

export function ChatItem({ thread_id, title, isGenerating = false, isTitleGenerating = false }: ChatItemProps) {
    const { setConversations } = useChatContext();

    const pathname = usePathname();
    const router = useRouter();

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [isLoading, setIsLoading] = useState(false);
    const [isNewTitle, setIsNewTitle] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsNewTitle(false);
    }, []);

    useEffect(() => {
        // Animation only if:
        // 1. Title is not generating
        // 2. There is a real title (not "New chat")
        // 3. Answer generation is in progress (means this is a new dialog)
        // 4. Title is not empty
        if (!isTitleGenerating && title && title !== 'New chat' && isGenerating && title.trim() !== '') {
            console.log('🆕 New title detected:', title);
            setIsNewTitle(true);
        }
    }, [isTitleGenerating, title, isGenerating]);

    useEffect(() => {
        if (!isGenerating) {
            setIsNewTitle(false);
        }
    }, [isGenerating]);

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
        setEditTitle(title);
    }, [title]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                handleCancelEdit();
            }
        };

        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing, handleCancelEdit]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
        setEditTitle(title);
    };

    const handleSaveEdit = async () => {
        if (editTitle.trim() === '' || editTitle.trim() === title) {
            handleCancelEdit();
            return;
        }

        setIsLoading(true);
        try {
            const result = await renameConversation(thread_id, editTitle.trim());
            if ((result as any).success) {
                onRenameConversation?.(thread_id, editTitle.trim());
                setIsEditing(false);
            } else {
                setEditTitle(title);
                setIsEditing(false);
            }
        } catch (error) {
            console.error('Error renaming conversation:', error);
            setEditTitle(title);
            setIsEditing(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            handleCancelEdit();
        }
    };

    const displayTitle = () => {
        if (isTitleGenerating) {
            return (
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="size-3 animate-spin" />
                    Generating...
                </span>
            );
        }

        // Animations only for new titles
        if (isNewTitle && !isTitleGenerating) {
            return (
                <TypingAnimation
                    className="text-sm text-gray-800 dark:text-white font-normal leading-normal tracking-normal"
                    duration={30}
                    delay={0}
                >
                    {title}
                </TypingAnimation>
            );
        }

        // Default display for existing titles
        return <span className="text-sm text-gray-800 dark:text-white">{title || 'New chat'}</span>;
    };

    const onDeleteConversation = async (threadId: string) => {
        await deleteConversation(threadId);
        setConversations((prev) => prev.filter((c) => c.thread_id !== threadId));

        if (pathname.includes(threadId)) {
            router.replace('/chat/new');
        }
    };

    const onRenameConversation = (threadId: string, newTitle: string) => {
        setConversations((prev) => prev.map((c) => (c.thread_id === threadId ? { ...c, title: newTitle } : c)));
    };

    if (isEditing) {
        return (
            <div
                ref={containerRef}
                className="group flex justify-between items-center px-4 py-2 rounded cursor-pointer border-2 border-primary transition-colors"
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSaveEdit}
                    className="text-sm text-gray-800 dark:text-white bg-transparent border-none outline-none flex-1 min-w-0"
                    disabled={isLoading}
                />
                {isLoading && <div className="text-xs text-muted-foreground">Saving...</div>}
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`group flex justify-between items-start px-4 py-3 rounded cursor-pointer hover:bg-muted transition-colors ${
                isGenerating ? 'bg-muted/50' : ''
            }`}
            onDoubleClick={handleDoubleClick}
        >
            <Link
                href={`/chat/${thread_id}`}
                className="text-sm text-gray-800 dark:text-white flex-1 flex items-start gap-2 min-w-0"
                onClick={(e) => {
                    if (isEditing) {
                        e.preventDefault();
                    }
                }}
            >
                <span className="flex-1 min-w-0 break-words leading-relaxed">{displayTitle()}</span>
                {isGenerating && <Loader2 className="size-3 animate-spin text-primary flex-shrink-0 mt-0.5" />}
            </Link>
            <div
                className="md:hidden block group-hover:block flex-shrink-0"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDeleteConversation(thread_id);
                }}
            >
                <Trash2 size={16} className="text-muted-foreground hover:text-destructive transition" />
            </div>
        </div>
    );
}
