const PrivacyPolicyPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600">Effective Date: February 01, 2025</p>

            <section className="mt-6 mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    LEXRAG PTE. LTD. ("LEXRAG," "we," "our," or "us") is committed to protecting your privacy. This
                    Privacy Policy explains how we collect, use, disclose, and protect your personal data when you
                    access our legal AI assistant services through our website{' '}
                    <a href="https://lexrag.com" className="text-blue-500 underline">
                        https://lexrag.com
                    </a>{' '}
                    ("Service").
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
                <p>
                    <strong>Data Protection Officer:</strong> Aleksandr Khazov
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Personal Data We Collect</h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>User Account Information:</strong> Name, email address, phone number.
                    </li>
                    <li>
                        <strong>Payment Information:</strong> Processed securely through Stripe; we do not store payment
                        details.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you interact with our Service (e.g., logins,
                        activity logs, device information).
                    </li>
                    <li>
                        <strong>Cookies & Tracking Data:</strong> Details on cookies are outlined in our{' '}
                        <a href="#" className="text-blue-500 underline">
                            Cookie Policy
                        </a>
                        .
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. How We Use Your Data</h2>
                <ul className="list-disc pl-6">
                    <li>To provide and improve our legal AI assistant services.</li>
                    <li>To manage user accounts and subscriptions.</li>
                    <li>To process payments securely.</li>
                    <li>To send administrative notifications (e.g., account updates, payment confirmations).</li>
                    <li>
                        To comply with legal obligations under Singapore’s{' '}
                        <strong>Personal Data Protection Act (PDPA)</strong>.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. Sharing of Personal Data</h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Bitrix24 CRM:</strong> For customer relationship management (includes name, email, and
                        phone number).
                    </li>
                    <li>
                        <strong>Payment Processors (Stripe):</strong> To facilitate secure transactions.
                    </li>
                    <li>
                        <strong>Legal & Regulatory Authorities:</strong> If required by law or legal process.
                    </li>
                </ul>
                <p>We do not sell or rent your personal data to third parties.</p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Data Storage & Security</h2>
                <ul className="list-disc pl-6">
                    <li>User data is stored on secure servers with encryption measures.</li>
                    <li>We implement industry-standard security protocols to prevent unauthorized access.</li>
                    <li>
                        <strong>Retention period:</strong> Data is retained as long as necessary to fulfill the purpose
                        for which it was collected.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. User Rights & Data Access</h2>
                <p>Under the PDPA, users have the right to:</p>
                <ul className="list-disc pl-6">
                    <li>Request access to their personal data.</li>
                    <li>Request correction of inaccurate personal data.</li>
                    <li>Withdraw consent for data processing.</li>
                </ul>
                <p>
                    To exercise these rights, contact our <strong>Data Protection Officer</strong> at{' '}
                    <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">
                        mail@lexrag.com
                    </a>
                    .
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">8. Cookies & Tracking Technologies</h2>
                <p>
                    Our website uses cookies to manage user sessions and enhance functionality. Users may modify cookie
                    settings in their browser. For more details, see our{' '}
                    <a href="#" className="text-blue-500 underline">
                        Cookie Policy
                    </a>
                    .
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">9. International Data Transfers</h2>
                <p>
                    Your data may be processed outside Singapore, but we ensure compliance with PDPA data transfer
                    regulations.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">10. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy periodically. Users will be notified of significant changes via
                    email or on our website.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">11. Contact Us</h2>
                <p>For any privacy-related inquiries, please contact our Data Protection Officer:</p>
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
                By using LEXRAG, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
            </p>
        </div>
    );
};

export default PrivacyPolicyPage;
