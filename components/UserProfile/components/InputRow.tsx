import { InputRowProps } from '@/types/Rows';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const InputRow = ({
    label,
    value,
    type = 'text',
    placeholder = '',
    inputClassName = '',
    labelClassName = '',
    children,
    id,
    onChange,
    className,
}: InputRowProps) => (
    <div className={`flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 p-4 ${className}`}>
        <Label htmlFor={id} className={`flex w-full max-w-56 text-sm font-medium ${labelClassName}`}>
            {label}
        </Label>
        {children ? (
            children
        ) : (
            <Input
                onChange={(e) => onChange?.(e.target.value)}
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                className={`flex w-full ${inputClassName}`}
            />
        )}
    </div>
);

export default InputRow;
