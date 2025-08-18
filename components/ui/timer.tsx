'use client';

import { useEffect, useState } from 'react';

type Parts = { d: number; h: number; m: number; s: number; finished: boolean };

const TARGET_TS = new Date('2025-09-08T00:00:00+03:00').getTime();

const calc = (): Parts => {
    const now = Date.now();
    const diff = Math.max(0, TARGET_TS - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return { d, h, m, s, finished: diff === 0 };
};

const pad = (n: number) => String(n).padStart(2, '0');

export const Timer = () => {
    const [t, setT] = useState<Parts>(() => calc());

    useEffect(() => {
        const id = setInterval(() => setT(calc()), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex gap-3 md:gap-6">
            {[
                { label: 'Days', value: t.d },
                { label: 'Hours', value: t.h },
                { label: 'Minutes', value: t.m },
                { label: 'Seconds', value: t.s },
            ].map((item) => (
                <div
                    key={item.label}
                    className="md:w-20 md:h-20 w-12 h-12 bg-white rounded-lg md:rounded-2xl flex flex-col items-center justify-center shadow-sm border-2 border-axis-indigo"
                >
                    <div className="text-2xl font-extrabold leading-none text-axis-indigo mb-1">{pad(item.value)}</div>
                    <div className="text-[6px] md:text-[10px] uppercase tracking-wide text-gray-500 font-bold">
                        {item.label}
                    </div>
                </div>
            ))}
        </div>
    );
};
