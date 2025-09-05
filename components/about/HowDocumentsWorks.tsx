'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import LiquidGlass from '../liquid-glass';

type Feature = { id: number; title: string; subtitle: string; img: string; list?: string[] };

const FEATURES: Feature[] = [
    {
        id: 1,
        title: 'Document Ingestion',
        subtitle: 'Your document is uploaded and automatically processed',
        list: [
            'Split into manageable chunks',
            'Each chunk is summarized',
            'Summaries are combined into a coherent overview',
        ],
        img: '/media/service/how-it-works-7.svg',
    },
    {
        id: 2,
        title: 'Predefined Review Mode',
        subtitle: '',
        list: ['High-Level Summary', 'Key Provisions & Arguments', 'Critical Legal Analysis'],
        img: '/media/service/how-it-works-8.svg',
    },
    {
        id: 3,
        title: 'Custom Queries',
        subtitle: 'You can also interrogate the document directly:',
        list: [
            'Without law database search',
            'With law database search',
            'Analysis applied to each provision, chunk or summary',
        ],
        img: '/media/service/how-it-works-9.svg',
    },
    {
        id: 4,
        title: 'Results You Can Use',
        subtitle: 'Recive clear outputs you can trust:',
        list: ['Summaries', 'Extracted provisions', 'Risk analysis', 'Direct answers to queries'],
        img: '/media/service/how-it-works-10.svg',
    },
];

type Props = {
    width?: number;
    height?: number;
    className?: string;
    speed?: number;
    reverse?: boolean;
    grayFrom?: string;
    grayTo?: string;
    lineLengthPct?: number;
    tailPct?: number;
    opacity?: number;
};

export function AnimatedGreenLineArrow({
    width = 117,
    height = 128,
    className,
    speed = 1.5,
    reverse = false,
    grayFrom = '#E5E7EB',
    grayTo = '#9CA3AF',
    lineLengthPct = 0.245,
    tailPct = 0.14,
    opacity = 0.95,
}: Props) {
    const [mounted, setMounted] = useState(false);
    const rid = useId().replace(/:/g, '');
    const baseGradId = `base-${rid}`;
    const beamGradId = `beam-${rid}`;
    const glowId = `glow-${rid}`;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <svg
                width={width}
                height={height}
                viewBox="0 0 117 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
                aria-hidden
            >
                <path
                    d="M107.309 127.618C108.335 128.026 109.498 127.526 109.907 126.499L116.565 109.776C116.974 108.75 116.473 107.587 115.447 107.178C114.421 106.77 113.258 107.27 112.849 108.297L106.93 123.162L92.0653 117.242C91.0391 116.834 89.8759 117.334 89.4673 118.361C89.0587 119.387 89.5593 120.55 90.5855 120.959L107.309 127.618ZM3.46528 0.577829C2.53098 -0.0113692 1.29593 0.268391 0.706736 1.20269C0.117537 2.13699 0.397298 3.37203 1.3316 3.96123L2.39844 2.26953L3.46528 0.577829ZM108.048 125.76L109.885 124.969C87.7644 73.5746 50.4244 30.1917 3.46528 0.577829L2.39844 2.26953L1.3316 3.96123C47.6125 33.1474 84.4124 75.9045 106.211 126.55L108.048 125.76Z"
                    fill={grayFrom}
                />
            </svg>
        );
    }

    const d =
        'M107.309 127.618C108.335 128.026 109.498 127.526 109.907 126.499L116.565 109.776C116.974 108.75 116.473 107.587 115.447 107.178C114.421 106.77 113.258 107.27 112.849 108.297L106.93 123.162L92.0653 117.242C91.0391 116.834 89.8759 117.334 89.4673 118.361C89.0587 119.387 89.5593 120.55 90.5855 120.959L107.309 127.618ZM3.46528 0.577829C2.53098 -0.0113692 1.29593 0.268391 0.706736 1.20269C0.117537 2.13699 0.397298 3.37203 1.3316 3.96123L2.39844 2.26953L3.46528 0.577829ZM108.048 125.76L109.885 124.969C87.7644 73.5746 50.4244 30.1917 3.46528 0.577829L2.39844 2.26953L1.3316 3.96123C47.6125 33.1474 84.4124 75.9045 106.211 126.55L108.048 125.76Z';

    const from = reverse ? '0 128' : '0 -128';
    const to = reverse ? '0 -128' : '0 128';

    const lineStart = 0.5;
    const solidStart = lineStart;
    const solidEnd = solidStart + lineLengthPct;
    const tailEnd = solidEnd + tailPct;

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 117 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden
        >
            <defs>
                <linearGradient
                    id={baseGradId}
                    x1="55.2234"
                    y1="2.26953"
                    x2="55.2234"
                    y2="125.76"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset="0" stopColor={grayFrom} />
                    <stop offset="1" stopColor={grayTo} />
                </linearGradient>

                <linearGradient
                    id={beamGradId}
                    x1="55.2234"
                    y1="0"
                    x2="55.2234"
                    y2="128"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop offset={Math.max(0, solidStart - 0.001)} stopColor="#06DF72" stopOpacity="0" />
                    <stop offset={Math.min(1, solidStart)} stopColor="#06DF72" stopOpacity="1" />
                    <stop offset={Math.min(1, solidEnd)} stopColor="#06DF72" stopOpacity="1" />
                    <stop offset={Math.min(1, tailEnd)} stopColor="#06DF72" stopOpacity="0" />
                    <stop offset="1" stopColor="#06DF72" stopOpacity="0" />

                    <animateTransform
                        attributeName="gradientTransform"
                        type="translate"
                        from={from}
                        to={to}
                        dur={`${speed}s`}
                        repeatCount="indefinite"
                    />
                </linearGradient>

                <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <path d={d} fill={`url(#${baseGradId})`} />

            <path
                d={d}
                fill={`url(#${beamGradId})`}
                filter={`url(#${glowId})`}
                opacity={opacity}
                style={{ mixBlendMode: 'normal' }}
            />

            <style>{`
        @media (prefers-reduced-motion: reduce) {
          #${beamGradId} > animateTransform { display: none; }
        }
      `}</style>
        </svg>
    );
}
function getCirclePosition(index: number, total: number, radius: number, startDeg = -90) {
    const deg = startDeg + (index * 360) / total;

    let adjustedRadius = radius;
    if (index === 0) {
        adjustedRadius = radius * 0.75;
    }
    if (index === 2) {
        adjustedRadius = radius * 0.75;
    }

    const rad = (deg * Math.PI) / 180;
    const x = Math.cos(rad) * adjustedRadius;
    const y = Math.sin(rad) * adjustedRadius;

    return { x, y, deg };
}

function CardItem({ feature, x, y, index }: { feature: Feature; x: number; y: number; index: number }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div
            className="absolute"
            style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
            }}
        >
            <div
                className="relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
            >
                <div
                    className={cx(
                        'absolute inset-0 rounded-full transition-all duration-200 pointer-events-none',
                        showTooltip ? 'opacity-100' : 'opacity-0',
                    )}
                    style={{
                        boxShadow: showTooltip
                            ? index === 3
                                ? '0 0 15px 4px rgba(6, 223, 114, 0.5)'
                                : '0 0 15px 4px rgba(187, 188, 250, 0.7)'
                            : 'none',
                        zIndex: 5,
                    }}
                />

                {index === 3 && (
                    <div
                        className="absolute inset-0 rounded-[32px] border border-white"
                        style={{
                            backgroundColor: '#06DF72',
                            opacity: 0.25,
                            zIndex: 8,
                        }}
                    />
                )}

                <LiquidGlass
                    className="group transition-all duration-200 min-w-[213px] relative z-10 cursor-pointer"
                    centered={false}
                    compact
                    displacementScale={10}
                    blurAmount={0.01}
                    saturation={120}
                    aberrationIntensity={1}
                    elasticity={0.03}
                    cornerRadius={9999}
                    mode="standard"
                    style={{ boxShadow: 'none', filter: 'none' }}
                >
                    <div
                        className={cx(
                            'flex gap-3 items-center rounded-full justify-start -translate-x-2',
                            index === 0 && '-translate-x-3',
                        )}
                    >
                        <Image src={feature.img} width={24} height={24} alt="icon" />
                        <p className="text-midnight-core text-lg leading-4 font-medium max-w-[173px]">
                            {feature.title}
                        </p>
                    </div>
                </LiquidGlass>

                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className="absolute text-sm text-black rounded-lg pointer-events-none top-full left-1/2 -translate-x-1/2 w-[280px] transform transition-all duration-200 ease-out rounded-xl"
                        style={{
                            backgroundColor: index === 3 ? '#06DF7299' : '#BBBCFA',
                            boxShadow:
                                index === 3 ? `0 0 20px rgba(6, 223, 114, 0.3)` : `0 0 20px rgba(187, 188, 250, 0.5)`,
                            padding: '16px',
                            marginTop: '15px',
                            zIndex: index === 3 ? 70 : 50,
                        }}
                    >
                        <span className="text-midnight-core">{feature.subtitle}</span>

                        <ul className="list-disc pl-5">
                            {feature.list?.map((item) => {
                                return (
                                    <li className="text-midnight-core" key={item}>
                                        {item}
                                    </li>
                                );
                            })}
                        </ul>

                        <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '12px solid transparent',
                                borderRight: '12px solid transparent',
                                borderBottom: index === 3 ? '12px solid #06DF7299' : '12px solid #BBBCFA',
                                marginBottom: '-1px',
                            }}
                        />
                    </div>
                )}
            </div>

            <div
                className={cx(
                    'absolute',
                    index === 0 && 'rotate-12 -right-28 top-20 -translate-y-3 -translate-x-1',
                    index === 1 && 'rotate-75 top-24 -left-5 translate-y-2',
                    index === 2 && 'rotate-184 bottom-20 -left-28 translate-y-1',
                    index === 3 && 'rotate-250 bottom-24 -right-2',
                )}
            >
                <AnimatedGreenLineArrow lineLengthPct={0.4} speed={2} height={105} />
            </div>
        </div>
    );
}

export default function HowDocumentsWorks({ className }: { className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [centerBox, setCenterBox] = useState({ w: 220, h: 190 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        const el = centerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setCenterBox({ w: width, h: height });
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    const ringGap = 28;
    const radius = useMemo(() => {
        if (!size.w || !size.h) return 280;
        const halfMin = Math.min(size.w, size.h) / 2;

        const centerHalfDiag = Math.sqrt((centerBox.w / 2) ** 2 + (centerBox.h / 2) ** 2);

        const r = Math.max(180, Math.min(halfMin - 40, centerHalfDiag + ringGap + 100));
        return Math.round(r);
    }, [size, centerBox]);

    const positions = useMemo(() => FEATURES.map((_, i) => getCirclePosition(i, FEATURES.length, radius)), [radius]);

    return (
        <section className={cx('', className)}>
            <div ref={containerRef} className="relative flex justify-center items-center min-h-[680px] w-full">
                <div ref={centerRef} className="relative z-10">
                    <LiquidGlass
                        className="group transition-all duration-200 w-[190px] h-[190px]"
                        centered={false}
                        compact
                        displacementScale={50}
                        blurAmount={0.01}
                        saturation={130}
                        aberrationIntensity={2}
                        elasticity={0.05}
                        cornerRadius={9999}
                        mode="standard"
                        style={{
                            boxShadow: 'none',
                            filter: 'none',
                            animation: 'pulseScale 2s ease-in-out infinite',
                        }}
                    >
                        <div className="overflow-hidden absolute">
                            <Image
                                className="translate-x-2"
                                src="/media/about/document-review.svg"
                                width={140}
                                height={140}
                                alt="document-review"
                            />
                        </div>
                    </LiquidGlass>
                </div>

                {FEATURES.map((feature, i) => (
                    <CardItem key={feature.id} feature={feature} x={positions[i].x} y={positions[i].y} index={i} />
                ))}
            </div>

            <style>{`
                @keyframes pulseScale {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </section>
    );
}
