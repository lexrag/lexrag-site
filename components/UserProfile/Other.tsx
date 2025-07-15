'use client';

import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import CardWrapper from '@/components/ui/card-wrapper';
import { Switch } from '@/components/ui/switch';
import Row from './components/Row';

const REFERRAL_LINK = 'https://lexrag.com/';

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
                    <span className="truncate">{REFERRAL_LINK}</span>{' '}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 p-0"
                        onClick={() => {
                            navigator.clipboard.writeText(REFERRAL_LINK);
                            toast.success('Copied to clipboard!');
                        }}
                    >
                        <Copy className="text-muted-foreground hover:text-primary size-4" />
                    </Button>
                </div>
            </Row>
        </CardWrapper>
    );
};

export default BasicSettingsCard;
