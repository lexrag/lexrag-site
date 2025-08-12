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
        <style>
            {`
                .clock-hand {
                    transition: stroke 0.3s ease;
                }
                
                svg:hover .clock-hand {
                    stroke: green;
                }
            `}
        </style>
        
        <mask id="path-1-inside-1_3999_1364" fill="white">
            <path d="M61.7119 0C65.4674 0 68.5126 3.04437 68.5127 6.7998V11.9775C92.1836 17.9929 109.693 39.4458 109.693 64.9883C109.693 95.1942 85.2059 119.681 55 119.681C24.7942 119.68 0.307771 95.1941 0.307617 64.9883C0.307617 39.446 17.8167 17.9932 41.4873 11.9775V6.7998C41.4874 3.04437 44.5326 0 48.2881 0H61.7119Z" />
        </mask>
        <path
            d="M61.7119 0C65.4674 0 68.5126 3.04437 68.5127 6.7998V11.9775C92.1836 17.9929 109.693 39.4458 109.693 64.9883C109.693 95.1942 85.2059 119.681 55 119.681C24.7942 119.68 0.307771 95.1941 0.307617 64.9883C0.307617 39.446 17.8167 17.9932 41.4873 11.9775V6.7998C41.4874 3.04437 44.5326 0 48.2881 0H61.7119Z"
            fill="url(#paint0_linear_3999_1364)"
        />
        <path
            d="M68.5127 6.7998H69.1927V6.79978L68.5127 6.7998ZM68.5127 11.9775H67.8327V12.5064L68.3452 12.6366L68.5127 11.9775ZM109.693 64.9883H110.373H109.693ZM55 119.681L55 120.361H55V119.681ZM0.307617 64.9883H-0.372388H0.307617ZM41.4873 11.9775L41.6548 12.6366L42.1673 12.5063V11.9775H41.4873ZM41.4873 6.7998L40.8073 6.79978V6.7998H41.4873ZM61.7119 0V0.680005C65.0919 0.680005 67.8326 3.42003 67.8327 6.79983L68.5127 6.7998L69.1927 6.79978C69.1925 2.6687 65.8428 -0.680005 61.7119 -0.680005V0ZM68.5127 6.7998H67.8327V11.9775H68.5127H69.1927V6.7998H68.5127ZM68.5127 11.9775L68.3452 12.6366C91.7219 18.5772 109.013 39.7643 109.013 64.9883H109.693H110.373C110.373 39.1273 92.6453 17.4086 68.6802 11.3185L68.5127 11.9775ZM109.693 64.9883H109.013C109.013 94.8186 84.8304 119.001 55 119.001V119.681V120.361C85.5815 120.361 110.373 95.5697 110.373 64.9883H109.693ZM55 119.681L55 119.001C25.1698 119 0.987774 94.8185 0.987622 64.9883H0.307617H-0.372388C-0.372232 95.5696 24.4187 120.36 55 120.361L55 119.681ZM0.307617 64.9883H0.987622C0.987622 39.7645 18.2784 18.5775 41.6548 12.6366L41.4873 11.9775L41.3198 11.3185C17.355 17.4089 -0.372388 39.1275 -0.372388 64.9883H0.307617ZM41.4873 11.9775H42.1673V6.7998H41.4873H40.8073V11.9775H41.4873ZM41.4873 6.7998L42.1673 6.79983C42.1674 3.42003 44.9081 0.680005 48.2881 0.680005V0V-0.680005C44.1572 -0.680005 40.8075 2.6687 40.8073 6.79978L41.4873 6.7998ZM48.2881 0V0.680005H61.7119V0V-0.680005H48.2881V0Z"
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
                <feFlood floodOpacity={0} result="BackgroundImageFix" />
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
