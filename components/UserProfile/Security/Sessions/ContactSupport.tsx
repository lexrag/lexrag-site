import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const ContactSupport = () => {
    return (
        <Card>
            <CardContent className="grow p-5 px-10 py-7.5 lg:pr-12.5">
                <div className="flex flex-wrap md:flex-nowrap items-center gap-6 md:gap-10">
                    <div className="flex flex-col items-start gap-3">
                        <h2 className="text-xl font-medium text-mono">Contact Support</h2>
                        <p className="text-sm text-foreground leading-5.5 mb-2.5">
                            Need assistance? Contact our support team for prompt, personalized help your queries &amp;
                            concerns.
                        </p>
                    </div>
                    <Image
                        className="dark:hidden max-h-[150px] w-auto"
                        alt="image"
                        src="/media/illustrations/4.svg"
                        width={150}
                        height={150}
                        priority
                    />
                    <Image
                        className="hidden dark:block max-h-[150px] w-auto"
                        alt="image"
                        src="/media/illustrations/4-dark.svg"
                        width={150}
                        height={150}
                        priority
                    />
                </div>
            </CardContent>
            <CardFooter className="flex items-center px-5 min-h-14 border-t border-border justify-center">
                <Button variant="link">Contact Support</Button>
            </CardFooter>
        </Card>
    );
};

export default ContactSupport;
