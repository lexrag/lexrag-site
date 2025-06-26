const TermsConditionsPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Terms and Conditions</h1>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    Welcome to LEXRAG PTE. LTD. ("LEXRAG," "we," "our," or "us"). These Terms and Conditions govern your
                    access to and use of our legal AI assistant services available through our website{' '}
                    <a href="https://lexrag.com" className="text-blue-500 underline">
                        https://lexrag.com
                    </a>{' '}
                    ("Service"). By accessing or using our Service, you agree to be bound by these Terms.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">2. Company Information</h2>
                <p>
                    <strong>Company Name:</strong> LEXRAG PTE. LTD.
                </p>
                <p>
                    <strong>UEN:</strong> 202430939E
                </p>
                <p>
                    <strong>Registered Office Address:</strong> 10 Anson Road, #20-05, International Plaza, Singapore
                    (079903)
                </p>
                <p>
                    <strong>Contact Email:</strong>{' '}
                    <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">
                        mail@lexrag.com
                    </a>
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Subscription Plans & Payments</h2>
                <p>Our Service is provided on a subscription basis with automatic renewal. The available plans are:</p>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Standard Plan (Free):</strong> Limited access to basic features.
                    </li>
                    <li>
                        <strong>Advanced Plan (SGD 50/month):</strong> Enhanced access, including AI-powered search
                        capabilities.
                    </li>
                    <li>
                        <strong>Premium Plan (SGD 100/month):</strong> Full access, priority support, and custom
                        reports.
                    </li>
                </ul>
                <p>
                    Payments are processed via Stripe. By subscribing, you authorize us to automatically charge your
                    payment method for recurring fees. If a payment fails, access to the Service may be suspended.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. Cancellation & Refund Policy</h2>
                <ul className="list-disc pl-6">
                    <li>Subscriptions automatically renew unless canceled.</li>
                    <li>Users may cancel their subscriptions at any time through their account settings.</li>
                    <li>Refunds are available within 14 days of purchase if the Service has not been used.</li>
                    <li>Partial refunds may be issued in case of technical issues affecting access.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. User Obligations</h2>
                <ul className="list-disc pl-6">
                    <li>Users must provide accurate registration information.</li>
                    <li>Users shall not misuse the Service for unlawful or fraudulent activities.</li>
                    <li>Users must not attempt to reverse-engineer or resell the Service.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Privacy & Data Protection</h2>
                <p>
                    We collect and process user data per our{' '}
                    <a href="#" className="text-blue-500 underline">
                        Privacy Policy
                    </a>
                    . Key points:
                </p>
                <ul className="list-disc pl-6">
                    <li>Personal data (name, email, phone) is collected for account management.</li>
                    <li>Payment details are processed securely via Stripe.</li>
                    <li>Some user data is shared with Bitrix24 CRM for customer support.</li>
                    <li>Users have rights under Singapore’s Personal Data Protection Act (PDPA).</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. Use of Cookies</h2>
                <p>
                    We use cookies to manage user sessions and improve the Service experience. Users may modify cookie
                    settings via their browser.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">8. Service Availability & Liability</h2>
                <ul className="list-disc pl-6">
                    <li>The Service is provided "as is" without warranties of any kind.</li>
                    <li>We are not liable for losses due to downtime, errors, or external service disruptions.</li>
                    <li>
                        Our maximum liability shall not exceed the total fees paid by the user in the last three months.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">9. Modifications to Terms</h2>
                <p>
                    We may update these Terms at any time. Continued use of the Service after changes constitutes
                    acceptance.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">10. Governing Law</h2>
                <p>These Terms are governed by and construed in accordance with the laws of Singapore.</p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">11. Contact Information</h2>
                <p>For any inquiries, please contact our Data Protection Officer:</p>
                <p>
                    <strong>Name:</strong> Aleksandr Khazov
                </p>
                <p>
                    <strong>Email:</strong>{' '}
                    <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">
                        mail@lexrag.com
                    </a>
                </p>
            </section>

            <p className="mt-6">
                By using LEXRAG, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.
            </p>
        </div>
    );
};

export default TermsConditionsPage;
