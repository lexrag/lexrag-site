'use client';

import { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import Row from '../components/Row';
import DeleteAccount from './DeleteAccount';
import { gdprEmailExport } from '@/api/user/gdprEmailExport';
import { toast } from 'sonner';

const acceptedDate = '2025-07-04';

const Legal = () => {
    const [requested, setRequested] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleRequest = async () => {
        setLoading(true);
        const success = await gdprEmailExport();
        setLoading(false);
        if (success) {
            setRequested(true);
            toast.success('GDPR data export requested. You will receive an email soon.');
        } else {
            toast.error('Failed to request GDPR data export.');
        }
    };

    return (
        <CardWrapper title="Legal & Compliance">
            <div>
                <Row label="Accepted Terms" actionIcon={null}>
                    <span className="text-muted-foreground text-xs">{acceptedDate}</span>
                </Row>
                <Row
                    label="GDPR Data Export"
                    actionIcon={
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleRequest}
                            disabled={requested || loading}
                        >
                            <DownloadIcon
                                className={`w-4 h-4 ${requested ? 'text-green-500' : ''}`}
                            />
                        </Button>
                    }
                >
                    <div className="flex items-center gap-2">
                        {requested ? (
                            <span className="text-xs text-muted-foreground">Export requested.</span>
                        ) : loading ? (
                            <span className="text-xs text-muted-foreground">Requesting...</span>
                        ) : (
                            <span className="text-xs text-muted-foreground">Request a data</span>
                        )}
                    </div>
                </Row>
                <DeleteAccount />
            </div>
        </CardWrapper>
    );
};

export default Legal;
