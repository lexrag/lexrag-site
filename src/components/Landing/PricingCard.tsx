import React from 'react';

interface PricingCardProps {
    title: string;
    description: string;
    price: number | string;
    priceSuffix: string;
    currency?: string;
    features: { text: string; available: boolean }[];
    variant?: 'default' | 'active';
    buttonLink?: string;
    buttonText?: string;
}

const PricingCard = ({
     title,
     description,
     price,
     priceSuffix,
     currency = '$',
     features,
     variant = 'default',
     buttonLink = '#',
     buttonText = 'Select',
 }: PricingCardProps) => {
    const isActive = variant === 'active';

    // Container styles based on variant
    const containerClasses = isActive
        ? 'md:w-[400px] m-auto flex flex-col items-center rounded-xl bg-blue-600 py-10 px-5'
        : 'md:w-[400px] m-auto flex flex-col items-center rounded-xl bg-white py-10 px-5';

    // Heading styles
    const titleClasses = isActive
        ? 'text-white mb-5 text-2xl'
        : 'text-gray-900 mb-5 text-2xl';
    const descClasses = isActive
        ? 'text-white opacity-75 mb-5'
        : 'text-gray-500 mb-5';
    const priceCurrencyClasses = isActive
        ? 'mb-2 text-white'
        : 'mb-2 text-blue-600';
    const priceNumberClasses = isActive
        ? 'text-4xl font-semibold text-white'
        : 'text-4xl font-semibold text-blue-600';
    const priceSuffixClasses = isActive
        ? 'text-sm text-white opacity-75'
        : 'text-sm opacity-50';

    // Feature text
    const featureTextClasses = isActive
        ? 'font-semibold text-white opacity-75 text-start pr-3'
        : 'font-semibold text-gray-800 text-start pr-3';

    // Icon classes – using placeholder icon classes (adjust based on your icon library)
    const checkIconClasses = isActive
        ? 'ki-duotone ki-check-circle text-2xl text-white'
        : 'ki-duotone ki-check-circle text-2xl text-green-500';
    const crossIconClasses = isActive
        ? 'ki-duotone ki-cross-circle text-2xl text-white'
        : 'ki-duotone ki-cross-circle text-2xl text-gray-400';

    // Button styles
    const buttonClasses = isActive
        ? 'bg-white text-blue-600 py-2 px-4 rounded'
        : 'bg-blue-600 text-white py-2 px-4 rounded';

    return (
        <div className={containerClasses}>
            {/* Heading */}
            <div className="mb-7 text-center">
                <h1 className={titleClasses}>{title}</h1>
                <div className={descClasses}>{description}</div>
                <div className="text-center">
                    <span className={priceCurrencyClasses}>{currency}</span>
                    <span className={priceNumberClasses}>{price}</span>
                    <span className={priceSuffixClasses}>{priceSuffix}</span>
                </div>
            </div>

            {/* Features */}
            <div className="w-full mb-10 space-y-5">
                {features.map((feature, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className={featureTextClasses}>{feature.text}</span>
                        {feature.available ? (
                            <i className={checkIconClasses} />
                        ) : (
                            <i className={crossIconClasses} />
                        )}
                    </div>
                ))}
            </div>

            {/* Select Button */}
            <a href={buttonLink} className={buttonClasses}>
                {buttonText}
            </a>
        </div>
    );
};

export default PricingCard;
