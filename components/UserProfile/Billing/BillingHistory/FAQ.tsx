import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CardWrapper from '@/components/ui/card-wrapper';

const FAQ_QUESTIONS = [
    {
        value: 'pricing',
        question: 'How is pricing determined for each plan ?',
        answer: 'Pricing for each plan is based on the features and resources included. Please refer to the pricing page for a detailed breakdown of what is included in each plan and how the costs are calculated.',
    },
    {
        value: 'payment-methods',
        question: 'What payment methods are accepted for subscriptions ?',
        answer: "Metronic embraces flexible licensing options that empower you to choose the perfect fit for your project's needs and budget. Understanding the factors influencing each plan's pricing helps you make an informed decision",
    },
    {
        value: 'hidden-fees',
        question: 'Are there any hidden fees in the pricing ?',
        answer: 'No, there are no hidden fees. All charges are clearly outlined before you complete your purchase.',
    },
    {
        value: 'annual-discount',
        question: 'Is there a discount for annual subscriptions ?',
        answer: 'Yes, we offer a discount for annual subscriptions. Please check the pricing page for current annual rates and discounts.',
    },
    {
        value: 'refunds',
        question: 'Do you offer refunds on subscription cancellations ?',
        answer: 'Refunds are handled according to our refund policy. Please review our terms and conditions for more information.',
    },
    {
        value: 'extra-features',
        question: 'Can I add extra features to my current plan ?',
        answer: 'Yes, you can add extra features to your current plan. Contact our support team to discuss your requirements and available options.',
    },
];

const FAQ = () => {
    return (
        <>
            <CardWrapper title={'FAQ'} className="w-full">
                <Accordion type="single" collapsible className="w-full ">
                    {FAQ_QUESTIONS.map(({ value, question, answer }) => (
                        <AccordionItem value={value} key={value} className="px-4">
                            <AccordionTrigger className="text-left font-semibold">{question}</AccordionTrigger>
                            <AccordionContent className="text-left text-accent-foreground">{answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardWrapper>
        </>
    );
};

export default FAQ;
