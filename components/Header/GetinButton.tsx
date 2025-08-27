'use client';

import LiquidGlass from '@/components/liquid-glass';
import '@/css/themes/reui.css';

const GetinButton = () => {
    const appBase = (process.env.NEXT_PUBLIC_APP_URL || 'https://app.lexrag.com').replace(/\/+$/, '');
    const appPath = '/chat/new';
    return (
        <div className="flex items-center gap-8">
            <div className="tab">
                <LiquidGlass
                    className="group transition-all duration-200 hover:scale-105"
                    centered={false}
                    compact
                    displacementScale={50}
                    blurAmount={0.01}
                    saturation={130}
                    aberrationIntensity={2}
                    elasticity={0.05}
                    cornerRadius={100}
                    mode="standard"
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
                        className="block text-axis-indigo group-hover:text-emerald-500 
                    text-base font-medium px-2 whitespace-nowrap transition-colors duration-200"
                        style={{
                            textShadow: 'none',
                        }}
                    >
                        Sign In
                    </span>
                </LiquidGlass>
            </div>
        </div>
    );
};

export default GetinButton;
