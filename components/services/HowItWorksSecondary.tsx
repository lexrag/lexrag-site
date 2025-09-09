'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { cx } from '@/utils/cx';
import LiquidGlass from '../liquid-glass';

type Feature = { id: number; title: string; subtitle: string; img: string };

const FEATURES: Feature[] = [
    { id: 1, title: 'User Input', subtitle: 'Natural Language query', img: '/media/service/how-it-works-7.svg' },
    {
        id: 2,
        title: 'Graph Retrieval',
        subtitle: 'System finds the most relevant status, cases, regulations',
        img: '/media/service/how-it-works-8.svg',
    },
    {
        id: 3,
        title: 'Semantic Understanding',
        subtitle: 'vector model interprets legal meaning, synonums, related concepts',
        img: '/media/service/how-it-works-9.svg',
    },
    {
        id: 4,
        title: 'Reasoning + Sources',
        subtitle: 'AI build a reasonign chain with citiations',
        img: '/media/service/how-it-works-10.svg',
    },
    {
        id: 5,
        title: 'Output to Lawyer',
        subtitle: 'Clear answer + linked authorities + explanation',
        img: '/media/service/how-it-works-11.svg',
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
    let deg = startDeg + (index * 360) / total;

    if (index === 2) {
        deg -= 10;
    }
    if (index === 3) {
        deg += 10;
    }

    const rad = (deg * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    let y = Math.sin(rad) * radius;

    if (index === 0) {
        y += 77.5;
    }

    if (index === 2 || index === 3) {
        y += 10;
    }

    if (index === 1 || index === 4) {
        y += 60;
    }

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
                            ? index === 4
                                ? '0 0 15px 4px rgba(6, 223, 114, 0.5)'
                                : '0 0 15px 4px rgba(187, 188, 250, 0.7)'
                            : 'none',
                        zIndex: 5,
                    }}
                />

                {index === 4 && (
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
                            index === 0 && '-translate-x-6',
                        )}
                    >
                        <Image src={feature.img} width={24} height={24} alt="icon" />
                        <span className="text-midnight-core text-sm font-medium whitespace-nowrap">
                            {feature.title}
                        </span>
                    </div>
                </LiquidGlass>

                {/* Tooltip */}
                {showTooltip && (
                    <div
                        className="absolute text-sm text-black rounded-lg pointer-events-none bottom-full left-1/2 -translate-x-1/2 w-[280px] transform transition-all duration-200 ease-out"
                        style={{
                            backgroundColor: index === 4 ? '#06DF7299' : '#CDC5F5',
                            boxShadow: index === 4 ? `0 0 20px rgba(6, 223, 114, 0.3)` : `0 0 20px #CDC5F5`,
                            padding: '16px',
                            marginBottom: '15px',
                            zIndex: index === 4 ? 70 : 50,
                        }}
                    >
                        {feature.subtitle}

                        <div
                            className="absolute top-full left-1/2 -translate-x-1/2"
                            style={{
                                width: 0,
                                height: 0,
                                borderLeft: '12px solid transparent',
                                borderRight: '12px solid transparent',
                                borderTop: index === 4 ? '12px solid #06DF7299' : '12px solid #CDC5F5',
                                marginTop: '-1px',
                            }}
                        />
                    </div>
                )}
            </div>

            <div
                className={cx(
                    'absolute',
                    index === 0 && 'rotate-1 -right-24 top-12 -translate-y-2 translate-x-6',
                    index === 1 && 'rotate-56 -left-2 translate-y-2',
                    index === 2 && 'rotate-132 top-0 -left-32',
                    index === 3 && 'rotate-196 bottom-20 left-16',
                    index === 4 && 'rotate-260 bottom-20 left-36 translate-y-2',
                )}
            >
                <AnimatedGreenLineArrow lineLengthPct={0.8} speed={2} />
            </div>
        </div>
    );
}

export default function HowItWorksSecondary({ className }: { className?: string }) {
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
            <h2 className="text-3xl md:text-5xl text-midnight-core max-w-[1200px] mx-auto px-4">How it works</h2>

            <div ref={containerRef} className="relative flex justify-center items-center min-h-[680px] w-full">
                <div ref={centerRef} className="relative z-10">
                    <LiquidGlass
                        className="group transition-all duration-200 w-[220px] h-[190px]"
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
                        <div className="-translate-y-5 overflow-hidden relative">
                            <svg
                                width="193"
                                height="173"
                                viewBox="0 0 183 163"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="group/svg"
                                style={
                                    {
                                        '--stroke-default': '#694AFF',
                                        '--stroke-hover': '#06DF72',
                                    } as React.CSSProperties
                                }
                            >
                                <style>
                                    {`
            .group\\/svg path[stroke="#694AFF"] {
                transition: stroke 0.3s ease;
                stroke: var(--stroke-default);
            }
            .group:hover .group\\/svg path[stroke="#694AFF"] {
                stroke: var(--stroke-hover);
            }
            .group\\/svg circle {
                transition: fill 0.3s ease;
            }
            .group:hover .group\\/svg .circle-1 { fill: #593edc; }
            .group:hover .group\\/svg .circle-2 { fill: #825bde; }
            .group:hover .group\\/svg .circle-3 { fill: #B25BDE; }
            .group:hover .group\\/svg .circle-4 { fill: #06df72; }
            .group:hover .group\\/svg .circle-5 { fill: #593edc; }
            .group:hover .group\\/svg .circle-6 { fill: #B25BDE; }
            .group:hover .group\\/svg .circle-7 { fill: #825bde; }
            .group:hover .group\\/svg .circle-8 { fill: #06df72; }
            `}
                                </style>
                                <path
                                    d="M100.319 152.199H46.2344V161.054H100.319V152.199Z"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M54.4428 143.346H92.1305C93.5766 143.346 94.7335 144.503 94.7335 145.949V152.2H51.8398V145.949C51.8398 144.503 52.9967 143.346 54.4428 143.346Z"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M47.8032 117.779L18.2582 147.324C16.0779 149.505 12.5628 149.505 10.4047 147.324C8.22446 145.144 8.22446 141.629 10.4047 139.471L39.9498 109.926"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M80.6418 99.7805L57.9727 77.1113L32.9123 102.172L55.5815 124.841L80.6418 99.7805Z"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M55.2413 129.429L58.0779 132.265C59.2495 133.437 61.149 133.437 62.3205 132.265L88.0622 106.524C89.2338 105.352 89.2338 103.453 88.0622 102.281L85.2257 99.4445C84.0541 98.273 82.1546 98.273 80.983 99.4445L55.2413 125.186C54.0698 126.358 54.0698 128.257 55.2413 129.429Z"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M25.4874 99.673L28.324 102.51C29.4956 103.681 31.3951 103.681 32.5666 102.51L58.3083 76.7679C59.4799 75.5963 59.4799 73.6968 58.3083 72.5252L55.4718 69.6887C54.3002 68.5171 52.4007 68.5171 51.2291 69.6887L25.4874 95.4303C24.3159 96.6019 24.3159 98.5014 25.4874 99.673Z"
                                    stroke="#694AFF"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <line x1="87.5682" y1="129.054" x2="101.251" y2="87.6059" stroke="white" />
                                <line x1="128.947" y1="125.318" x2="102.609" y2="89.9866" stroke="white" />
                                <line x1="140.27" y1="87.6152" x2="103.011" y2="87.6152" stroke="white" />
                                <path d="M139.625 50.1787L102.13 85.6865" stroke="white" />
                                <path d="M69.1172 90.6426L101.672 86.1578" stroke="white" />
                                <line x1="67.3887" y1="50.1445" x2="102.078" y2="84.8338" stroke="white" />
                                <line x1="104.253" y1="42.8149" x2="102.224" y2="85.2131" stroke="white" />
                                <g filter="url(#filter0_f_43743_2813)">
                                    <path
                                        d="M101.726 96.1098C107.048 96.1098 111.362 91.7956 111.362 86.4738C111.362 81.152 107.048 76.8379 101.726 76.8379C96.404 76.8379 92.0898 81.152 92.0898 86.4738C92.0898 91.7956 96.404 96.1098 101.726 96.1098Z"
                                        fill="url(#paint0_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="101.726" cy="86.4738" r="9.63593" fill="#06DF72" className="circle-1" />
                                <g filter="url(#filter1_f_43743_2813)">
                                    <path
                                        d="M66.7798 57.6944C70.8953 57.6944 74.2315 54.3582 74.2315 50.2427C74.2315 46.1273 70.8953 42.791 66.7798 42.791C62.6644 42.791 59.3281 46.1273 59.3281 50.2427C59.3281 54.3582 62.6644 57.6944 66.7798 57.6944Z"
                                        fill="url(#paint1_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="66.7798" cy="50.2427" r="7.4517" fill="white" className="circle-2" />
                                <g filter="url(#filter2_f_43743_2813)">
                                    <path
                                        d="M104.065 50.5538C108.18 50.5538 111.517 47.2176 111.517 43.1021C111.517 38.9866 108.18 35.6504 104.065 35.6504C99.9495 35.6504 96.6133 38.9866 96.6133 43.1021C96.6133 47.2176 99.9495 50.5538 104.065 50.5538Z"
                                        fill="url(#paint2_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="104.065" cy="43.1021" r="7.4517" fill="white" className="circle-3" />
                                <g filter="url(#filter3_f_43743_2813)">
                                    <path
                                        d="M86.9283 136.972C91.0437 136.972 94.38 133.636 94.38 129.52C94.38 125.405 91.0437 122.068 86.9283 122.068C82.8128 122.068 79.4766 125.405 79.4766 129.52C79.4766 133.636 82.8128 136.972 86.9283 136.972Z"
                                        fill="url(#paint3_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="86.9283" cy="129.52" r="7.4517" fill="white" className="circle-4" />

                                <circle cx="140.014" cy="50.2427" r="7.4517" fill="white" className="circle-5" />
                                <g filter="url(#filter5_f_43743_2813)">
                                    <path
                                        d="M147.631 94.3116C151.747 94.3116 155.083 90.9754 155.083 86.8599C155.083 82.7444 151.747 79.4082 147.631 79.4082C143.516 79.4082 140.18 82.7444 140.18 86.8599C140.18 90.9754 143.516 94.3116 147.631 94.3116Z"
                                        fill="url(#paint5_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="147.631" cy="86.8599" r="7.4517" fill="white" className="circle-6" />
                                <g filter="url(#filter6_f_43743_2813)">
                                    <path
                                        d="M68.3579 98.4034C72.4734 98.4034 75.8096 95.0672 75.8096 90.9517C75.8096 86.8362 72.4734 83.5 68.3579 83.5C64.2425 83.5 60.9062 86.8362 60.9062 90.9517C60.9062 95.0672 64.2425 98.4034 68.3579 98.4034Z"
                                        fill="url(#paint6_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="68.358" cy="90.9517" r="7.4517" fill="white" className="circle-7" />
                                <g filter="url(#filter7_f_43743_2813)">
                                    <path
                                        d="M129.092 133.503C133.208 133.503 136.544 130.167 136.544 126.051C136.544 121.936 133.208 118.6 129.092 118.6C124.977 118.6 121.641 121.936 121.641 126.051C121.641 130.167 124.977 133.503 129.092 133.503Z"
                                        fill="url(#paint7_linear_43743_2813)"
                                    />
                                </g>
                                <circle cx="129.092" cy="126.051" r="7.4517" fill="white" className="circle-8" />
                                <defs>
                                    <filter
                                        id="filter0_f_43743_2813"
                                        x="56.8989"
                                        y="41.647"
                                        width="89.6553"
                                        height="89.6533"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter1_f_43743_2813"
                                        x="24.1372"
                                        y="7.60009"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter2_f_43743_2813"
                                        x="61.4224"
                                        y="0.459461"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter3_f_43743_2813"
                                        x="44.2856"
                                        y="86.8774"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter4_f_43743_2813"
                                        x="97.3716"
                                        y="7.60009"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter5_f_43743_2813"
                                        x="104.989"
                                        y="44.2173"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter6_f_43743_2813"
                                        x="25.7153"
                                        y="48.3091"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <filter
                                        id="filter7_f_43743_2813"
                                        x="86.4497"
                                        y="83.4087"
                                        width="85.2842"
                                        height="85.2862"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="BackgroundImageFix"
                                            result="shape"
                                        />
                                        <feGaussianBlur
                                            stdDeviation="17.5955"
                                            result="effect1_foregroundBlur_43743_2813"
                                        />
                                    </filter>
                                    <linearGradient
                                        id="paint0_linear_43743_2813"
                                        x1="92.8098"
                                        y1="88.2888"
                                        x2="138.462"
                                        y2="79.0053"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#07D46E" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint1_linear_43743_2813"
                                        x1="59.8849"
                                        y1="51.6463"
                                        x2="95.1889"
                                        y2="44.4671"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint2_linear_43743_2813"
                                        x1="97.17"
                                        y1="44.5057"
                                        x2="132.474"
                                        y2="37.3265"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint3_linear_43743_2813"
                                        x1="80.0333"
                                        y1="130.924"
                                        x2="115.337"
                                        y2="123.744"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint4_linear_43743_2813"
                                        x1="133.119"
                                        y1="51.6463"
                                        x2="168.423"
                                        y2="44.4671"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint5_linear_43743_2813"
                                        x1="140.736"
                                        y1="88.2635"
                                        x2="176.04"
                                        y2="81.0843"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint6_linear_43743_2813"
                                        x1="61.463"
                                        y1="92.3553"
                                        x2="96.767"
                                        y2="85.1761"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                    <linearGradient
                                        id="paint7_linear_43743_2813"
                                        x1="122.197"
                                        y1="127.455"
                                        x2="157.501"
                                        y2="120.276"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#694AFF" />
                                        <stop offset="0.51" stopColor="#BBBCFA" />
                                        <stop offset="1" stopColor="#D6B9FA" />
                                    </linearGradient>
                                </defs>
                            </svg>
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
