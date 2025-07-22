'use client';

import React, { forwardRef, useRef } from 'react';
import { useMobileKeyboard } from '@/hooks/use-mobile-keyboard';
import { cn } from '@/lib/utils';

interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onSend?: () => void;
    showAttachButton?: boolean;
    showVoiceButton?: boolean;
    className?: string;
    inputClassName?: string;
    buttonClassName?: string;
}

export const MobileInput = forwardRef<HTMLInputElement, MobileInputProps>(
    ({ 
        onSend, 
        showAttachButton = true, 
        showVoiceButton = true,
        className,
        inputClassName,
        buttonClassName,
        ...props 
    }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null);
        const containerRef = useRef<HTMLDivElement>(null);
        
        const {
            isKeyboardVisible,
            keyboardHeight,
            isMobile,
            scrollToActiveElement
        } = useMobileKeyboard({
            onKeyboardShow: () => {
                scrollToActiveElement();
            },
            onKeyboardHide: () => {
                // You can add logic for when the keyboard is hidden
            }
        });

        // Combine refs
        const combinedRef = (node: HTMLInputElement) => {
            inputRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            } else if (ref) {
                ref.current = node;
            }
        };

        // Handle sending
        const handleSend = () => {
            if (onSend) {
                onSend();
            } else if (inputRef.current) {
                // Simulate pressing Enter
                const event = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true
                });
                inputRef.current.dispatchEvent(event);
            }
        };

        // Handle pressing Enter
        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
            }
            props.onKeyDown?.(e);
        };

        return (
            <div 
                ref={containerRef}
                className={cn(
                    "fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm transition-all duration-300 ease-in-out",
                    isMobile && isKeyboardVisible && "transform translate-y-0",
                    isMobile && !isKeyboardVisible && "transform translate-y-0",
                    className
                )}
                style={{
                    paddingBottom: isMobile && isKeyboardVisible ? `${keyboardHeight}px` : '0px'
                }}
            >
                <div className="flex items-center gap-3 p-4">
                    {/* Attach button */}
                    {showAttachButton && (
                        <button
                            type="button"
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 hover:bg-muted/80 transition-colors",
                                buttonClassName
                            )}
                            onClick={() => {
                                // Logic for attaching files
                                console.log('Attach file');
                            }}
                        >
                            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    )}

                    {/* Menu button */}
                    <button
                        type="button"
                        className={cn(
                            "flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 hover:bg-muted/80 transition-colors",
                            buttonClassName
                        )}
                        onClick={() => {
                            console.log('Menu action');
                        }}
                    >
                        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                    </button>

                    {/* Input field */}
                    <div className="flex-1 relative">
                        <input
                            ref={combinedRef}
                            type="text"
                            className={cn(
                                "w-full px-4 py-3 rounded-full bg-muted/60 border-0 focus:outline-none focus:ring-0 transition-all",
                                "placeholder:text-muted-foreground text-foreground",
                                inputClassName
                            )}
                            placeholder="Ask anything..."
                            onKeyDown={handleKeyDown}
                            {...props}
                        />
                    </div>

                    {/* Voice input button */}
                    {showVoiceButton && (
                        <button
                            type="button"
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 hover:bg-muted/80 transition-colors",
                                buttonClassName
                            )}
                            onClick={() => {
                                // Logic for voice input
                                console.log('Voice input');
                            }}
                        >
                            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </button>
                    )}

                </div>
            </div>
        );
    }
);

MobileInput.displayName = 'MobileInput'; 