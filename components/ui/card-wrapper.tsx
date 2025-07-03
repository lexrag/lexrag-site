import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';

interface CardWrapperProps {
    title: string;
    children: React.ReactNode;
    className?: string;
    headerActions?: React.ReactNode;
}

const CardWrapper = ({ title, children, className, headerActions }: CardWrapperProps) => (
    <Card className={`w-full ${className || ''}`}>
        <CardHeader className="flex items-center justify-between flex-wrap px-5 min-h-14 gap-2.5 border-b border-border">
            <CardHeading>
                <CardTitle>{title}</CardTitle>
            </CardHeading>
            {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </CardHeader>
        <CardContent className="p-0">{children}</CardContent>
    </Card>
);

export default CardWrapper;
