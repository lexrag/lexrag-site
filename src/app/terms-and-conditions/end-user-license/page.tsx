const EndUserLicenseAgreementPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">End User License Agreement (EULA)</h1>
            <p className="text-gray-600">Effective Date: February 01, 2025</p>

            <section className="mt-6 mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    This End User License Agreement ("EULA") is a legal agreement between LEXRAG PTE. LTD.
                    ("LEXRAG," "we," "our," or "us") and you ("User," "you," or "your") governing the use of our
                    legal AI assistant services available through{" "}
                    <a href="https://lexrag.com" className="text-blue-500 underline">https://lexrag.com</a> ("Service").
                    By accessing or using the Service, you agree to be bound by this EULA.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">2. License Grant</h2>
                <ul className="list-disc pl-6">
                    <li>
                        LEXRAG grants you a non-exclusive, non-transferable, limited license to access and use the
                        Service for personal or business purposes, in accordance with these terms.
                    </li>
                    <li>
                        You may not sublicense, sell, rent, lease, distribute, or otherwise make the Service available
                        to any third party.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Restrictions</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6">
                    <li>Modify, reverse-engineer, decompile, or disassemble any part of the Service.</li>
                    <li>Use the Service in violation of any applicable laws or regulations.</li>
                    <li>Interfere with the security, functionality, or accessibility of the Service.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. Subscription & Payment</h2>
                <ul className="list-disc pl-6">
                    <li>Access to the Service is based on subscription plans as described in our <a href="#" className="text-blue-500 underline">Terms & Conditions</a>.</li>
                    <li>Payments are processed through <strong>Stripe</strong> in Singapore Dollars (SGD).</li>
                    <li>Subscriptions renew automatically unless canceled.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. Data Collection & Privacy</h2>
                <p>LEXRAG collects and processes user data in accordance with our <a href="#" className="text-blue-500 underline">Privacy Policy</a>.</p>
                <ul className="list-disc pl-6">
                    <li>Some user data (name, email, phone) is shared with <strong>Bitrix24</strong> for customer relationship management.</li>
                    <li>Users have rights under Singapore’s <strong>Personal Data Protection Act (PDPA)</strong>.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Service Availability & Liability</h2>
                <ul className="list-disc pl-6">
                    <li>LEXRAG provides the Service "as is" without warranties of any kind.</li>
                    <li>We do not guarantee uninterrupted or error-free service.</li>
                    <li>Our liability is limited to the subscription fees paid in the last three months.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. Termination</h2>
                <ul className="list-disc pl-6">
                    <li>LEXRAG may suspend or terminate your access if you violate this EULA.</li>
                    <li>Users may terminate their subscription at any time via account settings.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">8. Governing Law</h2>
                <p>
                    This EULA is governed by the laws of Singapore. Any disputes shall be resolved in Singapore courts.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">9. Amendments</h2>
                <p>
                    LEXRAG reserves the right to modify this EULA at any time. Continued use of the Service constitutes
                    acceptance of any changes.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">10. Contact Information</h2>
                <p>For any inquiries regarding this EULA, please contact:</p>
                <p><strong>Email:</strong> <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">mail@lexrag.com</a></p>
            </section>

            <p className="mt-6">
                By using LEXRAG, you acknowledge that you have read, understood, and agreed to this End User License Agreement.
            </p>
        </div>
    );
}

export default EndUserLicenseAgreementPage;
