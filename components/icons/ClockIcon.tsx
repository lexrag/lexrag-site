import * as React from 'react';

const ClockIcon = ({ className = '', ...props }) => (
    <svg 
        width={114} 
        height={120} 
        viewBox="0 0 114 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-all duration-300 ${className}`}
        {...props}
    >
        <mask id="path-1-inside-1_3999_1364" fill="white">
            <path d="M61.7119 0C65.4674 0 68.5126 3.04437 68.5127 6.7998V11.9775C92.1836 17.9929 109.693 39.4458 109.693 64.9883C109.693 95.1942 85.2059 119.681 55 119.681C24.7942 119.68 0.307771 95.1941 0.307617 64.9883C0.307617 39.446 17.8167 17.9932 41.4873 11.9775V6.7998C41.4874 3.04437 44.5326 0 48.2881 0H61.7119Z" />
        </mask>
        <path
            d="M61.7119 0C65.4674 0 68.5126 3.04437 68.5127 6.7998V11.9775C92.1836 17.9929 109.693 39.4458 109.693 64.9883C109.693 95.1942 85.2059 119.681 55 119.681C24.7942 119.68 0.307771 95.1941 0.307617 64.9883C0.307617 39.446 17.8167 17.9932 41.4873 11.9775V6.7998C41.4874 3.04437 44.5326 0 48.2881 0H61.7119Z"
            fill="url(#paint0_linear_3999_1364)"
        />
        <path
            d="M61.7119 0C65.4674 0 68.5126 3.04437 68.5127 6.7998V11.9775C92.1836 17.9929 109.693 39.4458 109.693 64.9883C109.693 95.1942 85.2059 119.681 55 119.681C24.7942 119.68 0.307771 95.1941 0.307617 64.9883C0.307617 39.446 17.8167 17.9932 41.4873 11.9775V6.7998C41.4874 3.04437 44.5326 0 48.2881 0H61.7119Z"
            fill="url(#paint1_linear_3999_1364)"
            mask="url(#path-1-inside-1_3999_1364)"
        />
        <path d="M43.8381 64.5465L96.135 69.4356" stroke="white" strokeWidth={0.680005} strokeLinecap="round" />
        <circle cx={55.0003} cy={64.9876} r={9.65168} fill="white" />
        <path d="M23.4707 12.0068L34.64 7.07785" stroke="white" strokeWidth={3.40002} strokeLinecap="round" />
        <path d="M86.7588 12.0068L75.5895 7.07785" stroke="white" strokeWidth={3.40002} strokeLinecap="round" />
        <g filter="url(#filter1_d_3999_1364)">
            <path
                d="M52.5703 21.7598C67.6316 22.5067 94.3653 33.71 98.1306 67.3201"
                stroke="white"
                strokeWidth={8.16006}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="clock-hand"
            />
        </g>
        <defs>
            <filter
                id="filter1_d_3999_1364"
                x={43.0502}
                y={12.2396}
                width={70.0408}
                height={70.0408}
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                />
                <feOffset dx={2.72002} dy={2.72002} />
                <feGaussianBlur stdDeviation={4.08003} />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.999568 0 0 0 0 0.999568 0 0 0 0 0.999568 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3999_1364" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3999_1364" result="shape" />
            </filter>
            <linearGradient
                id="paint0_linear_3999_1364"
                x1={55.0005}
                y1={1.93034}
                x2={55.0005}
                y2={119.681}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" stopOpacity={0.2} />
                <stop offset={1} stopColor="white" stopOpacity={0.5} />
            </linearGradient>
            <linearGradient
                id="paint1_linear_3999_1364"
                x1={55.0005}
                y1={1.93034}
                x2={55.0005}
                y2={119.681}
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="white" stopOpacity={0} />
                <stop offset={1} stopColor="white" />
            </linearGradient>
        </defs>
    </svg>
);
export default ClockIcon;
