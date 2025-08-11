import { useEffect } from 'react';

export function useViewportHeight() {
    useEffect(() => {
        const updateViewportHeight = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // Set initial height
        updateViewportHeight();

        // Update on resize and orientation change
        window.addEventListener('resize', updateViewportHeight);
        window.addEventListener('orientationchange', updateViewportHeight);

        // Update on visual viewport change (mobile keyboard)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', updateViewportHeight);
        }

        return () => {
            window.removeEventListener('resize', updateViewportHeight);
            window.removeEventListener('orientationchange', updateViewportHeight);
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', updateViewportHeight);
            }
        };
    }, []);
}
