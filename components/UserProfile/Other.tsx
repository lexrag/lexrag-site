'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { Switch } from '@/components/ui/switch';
import Row from './components/Row';

const BasicSettingsCard = () => {
    return (
        <CardWrapper title="Other Settings">
            <Row
                label="Marketing Emails"
                actionIcon={<Switch id="marketing-emails" aria-label="Toggle marketing emails" />}
            >
                <span>Receive updates about new features and promotions</span>
            </Row>
            <Row
                label="Referral Link"
                actionIcon={
                    <Button variant="link" size="sm">
                        Re-create
                    </Button>
                }
            >
                <div className="flex items-center gap-2 w-[80%]">
                    <span className="truncate">https://lexrag.com/</span>{' '}
                    <Copy className="text-muted-foreground hover:text-primary size-4 cursor-pointer" />
                </div>
            </Row>
        </CardWrapper>
    );
};

export default BasicSettingsCard;
