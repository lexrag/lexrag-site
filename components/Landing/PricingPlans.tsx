import React from 'react';
import PricingCard from './PricingCard';

const PricingPlans = () => {
    const plans = [
        {
            title: 'Startup',
            description: 'Best Settings for Startups',
            price: 99,
            priceSuffix: '/ Mon',
            features: [
                { text: 'Up to 10 Active Users', available: true },
                { text: 'Up to 30 Project Integrations', available: true },
                { text: 'Keen Analytics Platform', available: false },
                { text: 'Targets Timelines & Files', available: false },
                { text: 'Unlimited Projects', available: false },
            ],
            variant: 'default' as const,
        },
        {
            title: 'Business',
            description: 'Best Settings for Business',
            price: 199,
            priceSuffix: '/ Mon',
            features: [
                { text: 'Up to 10 Active Users', available: true },
                { text: 'Up to 30 Project Integrations', available: true },
                { text: 'Keen Analytics Platform', available: true },
                { text: 'Targets Timelines & Files', available: true },
                { text: 'Unlimited Projects', available: false },
            ],
            variant: 'active' as const,
        },
        {
            title: 'Enterprise',
            description: 'Best Settings for Enterprise',
            price: 999,
            priceSuffix: '/ Mon',
            features: [
                { text: 'Up to 10 Active Users', available: true },
                { text: 'Up to 30 Project Integrations', available: true },
                { text: 'Keen Analytics Platform', available: true },
                { text: 'Targets Timelines & Files', available: true },
                { text: 'Unlimited Projects', available: true },
            ],
            variant: 'default' as const,
        },
    ];

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
            {plans.map((plan, index) => (
                <PricingCard
                    key={index}
                    title={plan.title}
                    description={plan.description}
                    price={plan.price}
                    priceSuffix={plan.priceSuffix}
                    features={plan.features}
                    variant={plan.variant}
                    buttonLink="#"
                    buttonText="Select"
                />
            ))}
        </div>
    );
};

export default PricingPlans;
