'use client';

import LiquidGlass from '@/components/liquid-glass';
import '@/css/themes/reui.css';
import { cn } from '@/lib/utils';
import { useSectionBackground } from '@/hooks/use-section-background';

const GetinButton = () => {
    const appBase = (process.env.NEXT_PUBLIC_APP_URL || 'https://app.lexrag.com').replace(/\/+$/, '');
    const appPath = '/chat/new';
    const currentBackground = useSectionBackground();
    const isDark = currentBackground === 'dark';
    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <LiquidGlass
                    className="group transition-all duration-200 hover:scale-105 border border-white/15 rounded-full"
                    centered={false}
                    compact
                    displacementScale={50}
                    blurAmount={0.01}
                    saturation={100}
                    aberrationIntensity={2}
                    elasticity={0.05}
                    cornerRadius={100}
                    mode="prominent"
                    padding="8px 16px"
                    style={{
                        boxShadow: 'none',
                        filter: 'none',
                    }}
                    onClick={() => {
                        window.location.href = `${appBase}${appPath}`;
                    }}
                >
                    <span
                        className={cn(
                            'block text-base font-medium px-2 whitespace-nowrap transition-colors duration-200',
                            isDark ? 'text-white group-hover:text-axis-indigo' : 'text-axis-indigo',
                        )}
                        style={{
                            textShadow: 'none',
                        }}
                    >
                        Get In
                    </span>
                </LiquidGlass>
            </div>
        </div>
    );
};

export default GetinButton;
