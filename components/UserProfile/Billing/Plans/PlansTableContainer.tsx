'use client';

import { useState } from 'react';
import PlansTable from './PlansTable';

export default function PlansTableContainer() {
    const [currentPlanId, setCurrentPlanId] = useState('1');

    const handleChangePlan = (planId: string) => {
        setCurrentPlanId(planId);
    };
    return <PlansTable currentPlanId={currentPlanId} onChangePlan={handleChangePlan} />;
}
