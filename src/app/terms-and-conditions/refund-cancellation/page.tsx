const RefundCancellationPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Refund & Cancellation Policy</h1>
            <p className="text-gray-600">Effective Date: February 01, 2025</p>

            <section className="mt-6 mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    LEXRAG PTE. LTD. ("LEXRAG," "we," "our," or "us") is committed to providing a high-quality
                    legal AI assistant service. This Refund & Cancellation Policy outlines the conditions under
                    which users may cancel their subscriptions and request refunds.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">2. Subscription Cancellation</h2>
                <ul className="list-disc pl-6">
                    <li>Users may cancel their subscription at any time through their account settings on{" "}
                        <a href="https://lexrag.com" className="text-blue-500 underline">https://lexrag.com</a>.
                    </li>
                    <li>Upon cancellation, the subscription remains active until the end of the current billing cycle.</li>
                    <li>Auto-renewal is disabled upon cancellation to prevent future charges.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Refund Policy</h2>
                <p>We offer refunds under the following conditions:</p>
                <ul className="list-disc pl-6">
                    <li><strong>14-Day Money-Back Guarantee:</strong> Users may request a full refund within 14 days of the initial subscription purchase, provided they have not used the service.</li>
                    <li><strong>Service Disruption:</strong> If the service was unavailable due to technical issues on our end for an extended period (exceeding 48 hours), users may request a pro-rated refund.</li>
                    <li><strong>Duplicate Charges:</strong> If a user is charged multiple times for the same subscription due to a billing error, a full refund for the duplicate transaction(s) will be issued.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. Non-Refundable Conditions</h2>
                <p>Refunds will not be granted under the following circumstances:</p>
                <ul className="list-disc pl-6">
                    <li>If the user has actively used the service beyond the trial period.</li>
                    <li>For partial months or unused portions of a billing cycle after cancellation.</li>
                    <li>If the issue arises due to the user’s failure to meet technical requirements or maintain proper internet connectivity.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. Refund Processing</h2>
                <ul className="list-disc pl-6">
                    <li>Refund requests must be submitted via email to{" "}
                        <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">mail@lexrag.com</a>
                        {" "}with the subject line <strong>"Refund Request"</strong>.
                    </li>
                    <li>Approved refunds will be processed within <strong>5-10 business days</strong> to the original payment method.</li>
                    <li>LEXRAG is not responsible for delays caused by banking institutions or payment processors.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Changes to This Policy</h2>
                <p>
                    LEXRAG reserves the right to modify this Refund & Cancellation Policy at any time. Updates will be
                    posted on our website, and users will be notified of significant changes.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. Contact Information</h2>
                <p>For any questions or refund-related inquiries, please contact our support team:</p>
                <p><strong>Email:</strong> <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">mail@lexrag.com</a></p>
            </section>

            <p className="mt-6">
                By using LEXRAG, you acknowledge that you have read, understood, and agreed to this Refund & Cancellation Policy.
            </p>
        </div>
    );
}

export default RefundCancellationPage;
