'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';

interface FeatureParamsProps {
    rows: {
        icon: string;
        label: string;
        badge: string;
        badgeColor: string;
    }[];
    className?: string;
}

const FeatureParams = ({ rows, className }: FeatureParamsProps) => {
    if (!rows || rows.length === 0) return null;

    return (
        <Card className={cn('w-full', className)}>
            <CardHeader>
                <CardHeading>
                    <CardTitle>Feature Parameters</CardTitle>
                </CardHeading>
            </CardHeader>

            <CardContent className="flex flex-col divide-y divide-border px-4 py-1">
                {rows.map((row, index) => (
                    <div key={index} className="flex items-center justify-between py-3 gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center shrink-0 rounded-full border border-gray-300 w-7 h-7">
                                <i className={`ki-filled ${row.icon} text-base`} aria-hidden="true"></i>
                            </div>
                            <span className="text-sm text-muted-foreground">{row.label}</span>
                        </div>

                        <Badge appearance="outline" variant={(row.badgeColor as any) || 'primary'} className="text-xs">
                            {row.badge}
                        </Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default FeatureParams;
