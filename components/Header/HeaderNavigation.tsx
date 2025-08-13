'use client';

import { Button } from '@/components/ui/button';
import '@/css/themes/reui.css';

const HeaderNavigation = () => {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="">
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    className="rounded-[80px] hover:bg-[var(--color-phase-green)] transition-colors duration-200 text-[var(--color-midnight-core)]"
                    onClick={() => scrollToSection('how-it-works')}
                >
                    Use Cases
                </Button>
                <Button
                    variant="ghost"
                    className="rounded-[80px] hover:bg-[var(--color-phase-green)] transition-colors duration-200 text-[var(--color-midnight-core)]"
                    onClick={() => scrollToSection('product-features')}
                >
                    Features
                </Button>
            </div>
        </div>
    );
};

export default HeaderNavigation;
