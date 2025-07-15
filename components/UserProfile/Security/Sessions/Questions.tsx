import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Questions = () => {
    return (
        <Card>
            <CardContent className="grow p-5 px-10 py-7.5 lg:pr-12.5">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-start gap-3">
                        <h2 className="text-xl font-medium text-mono">Questions ?</h2>
                        <p className="text-sm text-foreground leading-5.5 mb-2.5">
                            Visit our Help Center for detailed assistance on billing, payments, and subscriptions.
                        </p>
                    </div>
                    <Image
                        className="dark:hidden max-h-[150px]"
                        alt="image"
                        src="/media/illustrations/2.svg"
                        width={150}
                        height={150}
                        priority
                    />
                    <Image
                        className="hidden dark:block max-h-[150px]"
                        alt="image"
                        src="/media/illustrations/2-dark.svg"
                        width={150}
                        height={150}
                        priority
                    />
                </div>
            </CardContent>
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Button variant="link">Go to Help Center</Button>
            </CardFooter>
        </Card>
    );
};

export default Questions;
