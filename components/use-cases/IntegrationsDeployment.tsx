'use client';

import Compliance from './Compliance';
import Environments from './Environments';

export default function IntegrationsDeployment({ className }: { className?: string }) {
    return (
        <section className={className ?? ''}>
            <h2 className="mb-[55px] text-[32px]/[110%] text-midnight-core md:text-[64px]/[110%]">
                Integrations & Deployment
            </h2>

            <p className="text-midnight-core mb-5 mt-[52px] text-[40px]/[110%] font-semibold">Connectors</p>

            <div className="flex flex-wrap justify-around gap-6 mb-[52px]">
                <div className="relative w-[225px] h-[225px] p-10 rounded-md transition-colors [&:has(svg:hover)]:bg-white flex items-center justify-center">
                    <svg
                        viewBox="-3 0 262 262"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group w-[160px] h-[160px] cursor-pointer"
                        aria-label="Google"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <path
                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                            className="!fill-slate-500 transition-colors duration-300 group-hover:!fill-[#4285F4]"
                        />
                        <path
                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                            className="!fill-slate-400 transition-colors duration-300 group-hover:!fill-[#34A853]"
                        />
                        <path
                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                            className="!fill-slate-300 transition-colors duration-300 group-hover:!fill-[#FBBC05]"
                        />
                        <path
                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                            className="!fill-slate-600 transition-colors duration-300 group-hover:!fill-[#EB4335]"
                        />
                    </svg>
                </div>

                <div className="relative w-[225px] h-[225px] p-10 rounded-md transition-colors [&:has(svg:hover)]:bg-white flex items-center justify-center">
                    <svg
                        viewBox="0 0 2447.6 2452.5"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group w-[160px] h-[160px] cursor-pointer"
                        aria-label="Slack"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <g clipRule="evenodd" fillRule="evenodd">
                            <path
                                d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                                className="!fill-slate-400 transition-colors duration-300 group-hover:!fill-[#36c5f0]"
                            />
                            <path
                                d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                                className="!fill-slate-500 transition-colors duration-300 group-hover:!fill-[#2eb67d]"
                            />
                            <path
                                d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                                className="!fill-slate-600 transition-colors duration-300 group-hover:!fill-[#ecb22e]"
                            />
                            <path
                                d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1"
                                className="!fill-slate-300 transition-colors duration-300 group-hover:!fill-[#e01e5a]"
                            />
                        </g>
                    </svg>
                </div>

                <div className="relative w-[225px] h-[225px] p-10 rounded-md transition-colors [&:has(svg:hover)]:bg-white flex items-center justify-center">
                    <svg
                        viewBox="0 0 43 42"
                        xmlns="http://www.w3.org/2000/svg"
                        className="group w-[160px] h-[160px] cursor-pointer"
                        aria-label="Connector"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <linearGradient
                                id="SVGID_1_"
                                x1="3.8218"
                                y1="35.4323"
                                x2="18.1782"
                                y2="10.5677"
                                gradientTransform="matrix(1 0 0 -1 0 44)"
                            >
                                <stop offset="0" stopColor="#058F92" />
                                <stop offset="0.5" stopColor="#038489" />
                                <stop offset="1" stopColor="#026D71" />
                            </linearGradient>
                        </defs>

                        <circle
                            cx="22"
                            cy="12"
                            r="12"
                            className="fill-slate-600 transition-colors duration-300 group-hover:fill-[#036C70]"
                        />
                        <circle
                            cx="32"
                            cy="23"
                            r="11"
                            className="fill-slate-500 transition-colors duration-300 group-hover:fill-[#1A9BA1]"
                        />
                        <circle
                            cx="23.5"
                            cy="33.5"
                            r="8.5"
                            className="fill-slate-400 transition-colors duration-300 group-hover:fill-[#37C6D0]"
                        />

                        <path
                            d="M24,10.8v21.3c0,0.7-0.5,1.4-1.1,1.7C22.6,34,22.4,34,22.2,34H15c0-0.2,0-0.3,0-0.5c0-0.2,0-0.3,0-0.5 c0.2-3.2,2.2-6,5.1-7.3v-1.9c-6.5-1-11-7.2-10-13.7c0,0,0-0.1,0-0.1c0-0.3,0.1-0.7,0.2-1h11.8C23.2,9,24,9.8,24,10.8z"
                            className="opacity-10 fill-slate-700 transition-all duration-300"
                        />
                        <path
                            d="M21.2,10h-11c-1.1,6.5,3.3,12.7,9.8,13.8c0.2,0,0.4,0.1,0.6,0.1c-3.1,1.5-5.4,5.6-5.6,9.1c0,0.2,0,0.3,0,0.5 c0,0.2,0,0.3,0,0.5c0,0.3,0.1,0.7,0.1,1h6c0.7,0,1.4-0.5,1.7-1.1c0.1-0.2,0.1-0.5,0.1-0.7V11.8C23,10.8,22.2,10,21.2,10z"
                            className="opacity-20 fill-slate-700 transition-all duration-300"
                        />
                        <path
                            d="M21.2,10h-11c-1.1,6.5,3.3,12.7,9.8,13.8c0.1,0,0.3,0,0.4,0.1c-3,1.6-5.2,5.7-5.4,9.1h6.1c1,0,1.8-0.8,1.8-1.8 V11.8C23,10.8,22.2,10,21.2,10z"
                            className="opacity-20 fill-slate-700 transition-all duration-300"
                        />
                        <path
                            d="M20.2,10h-10c-1,6.2,2.8,12.1,8.9,13.6c-2.3,2.6-3.7,5.9-4,9.4h5.1c1,0,1.8-0.8,1.8-1.8V11.8 C22,10.8,21.2,10,20.2,10z"
                            className="opacity-20 fill-slate-700 transition-all duration-300"
                        />

                        <path
                            d="M1.8,10h18.3c1,0,1.8,0.8,1.8,1.8v18.3c0,1-0.8,1.8-1.8,1.8H1.8c-1,0-1.8-0.8-1.8-1.8V11.8 C0,10.8,0.8,10,1.8,10z"
                            className="fill-slate-300 transition-all duration-300 group-hover:hidden"
                        />
                        <path
                            d="M1.8,10h18.3c1,0,1.8,0.8,1.8,1.8v18.3c0,1-0.8,1.8-1.8,1.8H1.8c-1,0-1.8-0.8-1.8-1.8V11.8 C0,10.8,0.8,10,1.8,10z"
                            fill="url(#SVGID_1_)"
                            className="hidden transition-all duration-300 group-hover:block"
                        />
                        <path
                            d="M8.2,20.8c-0.4-0.3-0.8-0.7-1-1.1c-0.3-0.5-0.4-1-0.4-1.5c0-0.7,0.2-1.4,0.7-2c0.5-0.6,1.1-1,1.8-1.2 c0.8-0.3,1.6-0.4,2.5-0.4c1.1,0,2.2,0.1,3.2,0.5v2.3c-0.5-0.3-1-0.5-1.5-0.6c-0.6-0.1-1.1-0.2-1.7-0.2c-0.6,0-1.2,0.1-1.8,0.4 c-0.4,0.2-0.7,0.6-0.7,1.1c0,0.3,0.1,0.5,0.3,0.8c0.2,0.2,0.5,0.4,0.8,0.6c0.3,0.2,0.8,0.4,1.5,0.7c0.1,0,0.1,0.1,0.2,0.1 c0.7,0.3,1.3,0.6,1.9,0.9c0.5,0.3,0.8,0.7,1.1,1.1c0.3,0.5,0.4,1.1,0.4,1.7c0,0.7-0.2,1.5-0.6,2c-0.4,0.5-1,0.9-1.7,1.1 c-0.8,0.2-1.6,0.4-2.4,0.4c-0.7,0-1.5-0.1-2.2-0.2c-0.6-0.1-1.2-0.3-1.8-0.5v-2.4c0.5,0.4,1.2,0.7,1.8,0.9c0.6,0.2,1.3,0.3,2,0.3 c0.6,0,1.2-0.1,1.8-0.4c0.4-0.2,0.6-0.6,0.6-1.1c0-0.3-0.1-0.6-0.3-0.8c-0.3-0.3-0.6-0.5-0.9-0.7c-0.4-0.2-1-0.5-1.8-0.8 C9.3,21.5,8.7,21.1,8.2,20.8z"
                            className="transition-colors duration-300 fill-slate-50 group-hover:fill-white"
                        />
                    </svg>
                </div>
            </div>

            <Environments />
            <Compliance />
        </section>
    );
}
