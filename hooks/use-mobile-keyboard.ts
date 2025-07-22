'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseMobileKeyboardOptions {
    onKeyboardShow?: () => void;
    onKeyboardHide?: () => void;
    enableAutoScroll?: boolean;
}

export function useMobileKeyboard(options: UseMobileKeyboardOptions = {}) {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [initialViewportHeight, setInitialViewportHeight] = useState(0);

    const { onKeyboardShow, onKeyboardHide, enableAutoScroll = true } = options;

    // Determine if this is a mobile device
    const isMobile = typeof window !== 'undefined' && 
        (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         window.innerWidth <= 768);

    // Track changes in viewport
    const handleResize = useCallback(() => {
        const currentHeight = window.innerHeight;
        setViewportHeight(currentHeight);

        if (initialViewportHeight === 0) {
            setInitialViewportHeight(currentHeight);
            return;
        }

        // If the height has decreased - the keyboard has appeared
        if (currentHeight < initialViewportHeight) {
            const heightDifference = initialViewportHeight - currentHeight;
            setKeyboardHeight(heightDifference);
            
            if (!isKeyboardVisible) {
                setIsKeyboardVisible(true);
                onKeyboardShow?.();
            }
        } 
        // If the height has increased - the keyboard has hidden
        else if (currentHeight >= initialViewportHeight) {
            if (isKeyboardVisible) {
                setIsKeyboardVisible(false);
                setKeyboardHeight(0);
                onKeyboardHide?.();
            }
        }
    }, [initialViewportHeight, isKeyboardVisible, onKeyboardShow, onKeyboardHide]);

    // Handle focus on input
    const handleInputFocus = useCallback(() => {
        if (isMobile && enableAutoScroll) {
            // Small delay to correctly determine the height of the keyboard
            setTimeout(() => {
                handleResize();
            }, 100);
        }
    }, [isMobile, enableAutoScroll, handleResize]);

    // Handle losing focus
    const handleInputBlur = useCallback(() => {
        if (isMobile) {
            // Small delay before checking to ensure the keyboard has hidden
            setTimeout(() => {
                handleResize();
            }, 100);
        }
    }, [isMobile, handleResize]);

    // Scroll to active element
    const scrollToActiveElement = useCallback(() => {
        if (!isMobile || !enableAutoScroll) return;

        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')) {
            setTimeout(() => {
                activeElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 300);
        }
    }, [isMobile, enableAutoScroll]);

    useEffect(() => {
        if (!isMobile) return;

        // Initialization
        setInitialViewportHeight(window.innerHeight);
        setViewportHeight(window.innerHeight);

        // Event listeners
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', () => {
            setTimeout(handleResize, 100);
        });

        // Event listeners for input elements
        document.addEventListener('focusin', handleInputFocus);
        document.addEventListener('focusout', handleInputBlur);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('focusin', handleInputFocus);
            document.removeEventListener('focusout', handleInputBlur);
        };
    }, [isMobile, handleResize, handleInputFocus, handleInputBlur]);

    return {
        isKeyboardVisible,
        keyboardHeight,
        viewportHeight,
        isMobile,
        scrollToActiveElement,
        handleInputFocus,
        handleInputBlur
    };
} 