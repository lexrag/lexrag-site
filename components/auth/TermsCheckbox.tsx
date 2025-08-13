'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface TermsCheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function TermsCheckbox({ checked, onChange }: TermsCheckboxProps) {
    return (
        <div className="flex items-center space-x-2 w-full">
            <Checkbox id="agreeToTerms" checked={checked} onCheckedChange={onChange} required />
            <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="/terms-and-conditions/terms-conditions" className="text-[var(--Brand-Primary-Axis-Indigo)]">
                    Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/terms-and-conditions/privacy-policy" className="text-[var(--Brand-Primary-Axis-Indigo)]">
                    Privacy Policy
                </a>
            </Label>
        </div>
    );
}
