'use client';

import { useEffect, useState } from 'react';

export type SectionBackground = 'dark' | 'light';

export const useSectionBackground = () => {
    const [currentBackground, setCurrentBackground] = useState<SectionBackground>('dark');

    useEffect(() => {
        const updateBackground = () => {
            const sections = document.querySelectorAll('[data-section-bg]');
            let darkSectionVisible = false;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const headerHeight = 120;

                //
                if (rect.top <= headerHeight && rect.bottom >= 0) {
                    const bg = section.getAttribute('data-section-bg') as SectionBackground;
                    if (bg === 'dark') {
                        darkSectionVisible = true;
                    }
                }
            });

            setCurrentBackground(darkSectionVisible ? 'dark' : 'light');
        };

        const observer = new IntersectionObserver(
            () => {
                updateBackground();
            },
            {
                root: null,
                rootMargin: '-60px 0px -60px 0px',
                threshold: 0,
            },
        );

        const sections = document.querySelectorAll('[data-section-bg]');
        sections.forEach((section) => observer.observe(section));

        const handleScroll = () => {
            updateBackground();
        };

        window.addEventListener('scroll', handleScroll);

        updateBackground();

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return currentBackground;
};
