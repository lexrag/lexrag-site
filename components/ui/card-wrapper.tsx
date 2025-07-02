import { Card, CardContent, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';

interface CardWrapperProps {
    title: string;
    children: React.ReactNode;
}

const CardWrapper = ({ title, children }: CardWrapperProps) => (
    <Card className="w-full">
        <CardHeader>
            <CardHeading>
                <CardTitle>{title}</CardTitle>
            </CardHeading>
        </CardHeader>
        <CardContent className="py-1">{children}</CardContent>
    </Card>
);

export default CardWrapper;
