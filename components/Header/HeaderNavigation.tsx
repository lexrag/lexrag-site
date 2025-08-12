'use client';

import { Button } from '@/components/ui/button';
import '@/components/ui/css-variables.css';

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
                    className="rounded-[80px] hover:bg-[var(--Brand-Primary-Phase-Green)] transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]"
                    onClick={() => scrollToSection('how-it-works')}
                >
                    Use Cases
                </Button>
                <Button
                    variant="ghost"
                    className="rounded-[80px] hover:bg-[var(--Brand-Primary-Phase-Green)] transition-colors duration-200 text-[var(--Brand-Primary-Midnight-Core)]"
                    onClick={() => scrollToSection('product-features')}
                >
                    Features
                </Button>
            </div>
        </div>
    );
};

export default HeaderNavigation;
