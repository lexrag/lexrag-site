'use client';

import React, { useEffect, useRef } from 'react';
import { cx } from '@/utils/cx';

type Tilt3DProps = {
    className?: string;
    maxTilt?: number;
    perspective?: number;
    scale?: number;
    radius?: number;
    hoverGlow?: boolean;
    children: React.ReactNode;
};

export default function Tilt3D({
    className,
    maxTilt = 14,
    perspective = 1000,
    scale = 1.02,
    radius = 24,
    hoverGlow = false,
    children,
}: Tilt3DProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current!;
        const inner = innerRef.current!;
        if (!container || !inner) return;

        const reduceMotion =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const setTransform = (rx: number, ry: number, s: number) => {
            inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(${s})`;
        };

        const onEnter = () => {
            if (reduceMotion) return;
            inner.style.transition = 'transform 120ms ease-out';
        };

        const onMove = (e: MouseEvent) => {
            if (reduceMotion) return;
            const rect = container.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;
            const ry = (px - 0.5) * (maxTilt * 2);
            const rx = (0.5 - py) * (maxTilt * 2);

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                setTransform(rx, ry, scale);
                (container.style as any).setProperty('--tilt-x', `${e.clientX - rect.left}px`);
                (container.style as any).setProperty('--tilt-y', `${e.clientY - rect.top}px`);
            });
        };

        const onLeave = () => {
            if (reduceMotion) return;
            inner.style.transition = 'transform 280ms ease';
            setTransform(0, 0, 1);
        };

        container.style.perspective = `${perspective}px`;
        container.addEventListener('mouseenter', onEnter);
        container.addEventListener('mousemove', onMove);
        container.addEventListener('mouseleave', onLeave);

        return () => {
            container.removeEventListener('mouseenter', onEnter);
            container.removeEventListener('mousemove', onMove);
            container.removeEventListener('mouseleave', onLeave);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [maxTilt, perspective, scale]);

    return (
        <div
            ref={containerRef}
            className={cx(
                'relative inline-block will-change-transform [transform-style:preserve-3d] select-none',
                hoverGlow && 'group',
                className,
            )}
            style={
                {
                    '--tilt-x': '50%',
                    '--tilt-y': '50%',
                } as React.CSSProperties
            }
        >
            {hoverGlow && (
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[var(--r,24px)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    style={
                        {
                            background:
                                'radial-gradient(220px 220px at var(--tilt-x) var(--tilt-y), rgba(255,255,255,0.22), rgba(255,255,255,0.0) 60%)',
                            transform: 'translateZ(60px)',
                            '--r': `${radius}px`,
                        } as React.CSSProperties
                    }
                />
            )}

            <div
                ref={innerRef}
                className="transform-gpu [backface-visibility:hidden]"
                style={{
                    borderRadius: radius,
                    transform: 'rotateX(0deg) rotateY(0deg) scale(1)',
                }}
            >
                {children}
            </div>
        </div>
    );
}
