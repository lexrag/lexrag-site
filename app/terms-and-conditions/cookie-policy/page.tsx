const CookiePolicyPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Cookie Policy</h1>
            <p className="text-gray-600">Effective Date: February 01, 2025</p>

            <section className="mt-6 mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    LEXRAG PTE. LTD. ("LEXRAG," "we," "our," or "us") uses cookies and similar tracking technologies
                    to enhance user experience and improve our legal AI assistant services. This Cookie Policy
                    explains how we use cookies and how users can manage them.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">2. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device when you visit our website,{" "}
                    <a href="https://lexrag.com" className="text-blue-500 underline">https://lexrag.com</a>.
                    They help us remember user preferences, improve security, and analyze website traffic.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Types of Cookies We Use</h2>
                <ul className="list-disc pl-6">
                    <li><strong>Essential Cookies:</strong> Necessary for website functionality (e.g., user authentication, session management).</li>
                    <li><strong>Performance Cookies:</strong> Collect anonymous data on website usage to improve our services.</li>
                    <li><strong>Functional Cookies:</strong> Store user preferences to enhance experience.</li>
                    <li><strong>Analytical Cookies:</strong> Used to track user behavior and improve our website.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. Third-Party Cookies</h2>
                <p>Some cookies may be set by third-party services we integrate, such as:</p>
                <ul className="list-disc pl-6">
                    <li><strong>Bitrix24 CRM:</strong> For customer support and account management.</li>
                    <li><strong>Stripe:</strong> For secure payment processing.</li>
                    <li><strong>Analytics providers:</strong> (e.g., Google Analytics, if applicable).</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. Managing Cookies</h2>
                <p>
                    Users can control or disable cookies in their browser settings. However, disabling
                    essential cookies may impact the functionality of our Service.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Changes to This Policy</h2>
                <p>
                    We may update this Cookie Policy periodically. Users will be notified of significant changes via our website.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. Contact Us</h2>
                <p>For any inquiries about our cookie practices, please contact:</p>
                <p><strong>Email:</strong> <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">mail@lexrag.com</a></p>
            </section>

            <p className="mt-6">
                By using LEXRAG, you consent to our use of cookies as described in this policy.
            </p>
        </div>
    );
}

export default CookiePolicyPage;
