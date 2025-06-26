'use client';

import CardFlash from '@/components/Layout/CardFlash';

interface DeffinitionCardProps {
    details: {
        subtitle: string;
        icon: string;
        title: string;
        description: string[];
    };
}

const DeffinitionCard = ({ details }: DeffinitionCardProps) => {
    return <CardFlash {...details} />;
};

export default DeffinitionCard;
