'use client';

import { useState } from 'react';
import { DownloadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import Row from '../components/Row';
import DeleteAccount from './DeleteAccount';
import DeleteAccountDialog from './DeleteAccountDialog';

const acceptedDate = '2025-07-04';

const Legal = () => {
    const [requested, setRequested] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDeleteAccountOpen(false);
        }, 1000);
    };

    const handleRequest = async () => {
        setLoading(true);
        setTimeout(() => {
            setRequested(true);
            setLoading(false);
        }, 1000);
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
                        <Button variant="ghost" size="icon" onClick={handleRequest}>
                            <DownloadIcon
                                className={`w-4 h-4 ${requested ? 'text-green-500' : ''}`}
                                onClick={handleRequest}
                            />
                        </Button>
                    }
                >
                    <div className="flex items-center gap-2">
                        {requested ? (
                            <span className="text-xs text-muted-foreground">Export requested.</span>
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
