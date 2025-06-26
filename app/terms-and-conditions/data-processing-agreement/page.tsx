const DataProcessingAgreementPage = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Data Processing Agreement</h1>
            <p className="text-gray-600">Effective Date: February 01, 2025</p>

            <section className="mt-6 mb-4">
                <h2 className="text-xl font-semibold">1. Introduction</h2>
                <p>
                    This Data Processing Agreement ("DPA") is entered into between LEXRAG PTE. LTD. ("LEXRAG," "we,"
                    "our," or "us") and the user ("Data Controller") to outline the terms governing the processing of
                    personal data under the
                    <strong> Personal Data Protection Act (PDPA) </strong> of Singapore.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">2. Definitions</h2>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Personal Data:</strong> Any information relating to an identified or identifiable
                        natural person.
                    </li>
                    <li>
                        <strong>Processing:</strong> Any operation performed on personal data, including collection,
                        storage, transfer, and deletion.
                    </li>
                    <li>
                        <strong>Data Controller:</strong> The entity that determines the purposes and means of
                        processing personal data.
                    </li>
                    <li>
                        <strong>Data Processor:</strong> LEXRAG, processing personal data on behalf of the Data
                        Controller.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">3. Scope of Data Processing</h2>
                <p>LEXRAG processes personal data for the following purposes:</p>
                <ul className="list-disc pl-6">
                    <li>User account management (name, email, phone number).</li>
                    <li>Subscription and payment processing via Stripe.</li>
                    <li>Customer relationship management via Bitrix24.</li>
                    <li>Service performance analytics and improvements.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">4. Data Security & Confidentiality</h2>
                <ul className="list-disc pl-6">
                    <li>LEXRAG implements industry-standard security measures to protect personal data.</li>
                    <li>All personal data is encrypted and stored securely.</li>
                    <li>Access to personal data is restricted to authorized personnel only.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">5. Subprocessing</h2>
                <p>LEXRAG engages the following third-party subprocessors:</p>
                <ul className="list-disc pl-6">
                    <li>
                        <strong>Bitrix24:</strong> For customer data management (name, email, phone number).
                    </li>
                    <li>
                        <strong>Stripe:</strong> For payment processing.
                    </li>
                    <li>
                        <strong>Hosting Providers:</strong> Secure data storage and infrastructure services.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">6. Data Retention & Deletion</h2>
                <ul className="list-disc pl-6">
                    <li>Personal data is retained as long as necessary for providing services.</li>
                    <li>
                        Upon termination of service or request by the user, data will be deleted or anonymized unless
                        legal obligations require otherwise.
                    </li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">7. Data Subject Rights</h2>
                <p>Users have the right to:</p>
                <ul className="list-disc pl-6">
                    <li>Request access to their personal data.</li>
                    <li>Request correction or deletion of personal data.</li>
                    <li>Withdraw consent for data processing.</li>
                </ul>
                <p>
                    Requests should be submitted to{' '}
                    <a href="mailto:mail@lexrag.com" className="text-blue-500 underline">
                        mail@lexrag.com
                    </a>
                    .
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">8. Cross-Border Data Transfers</h2>
                <p>
                    If personal data is transferred outside Singapore, LEXRAG ensures compliance with PDPA data transfer
                    requirements.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">9. Amendments</h2>
                <p>LEXRAG may update this DPA from time to time. Users will be notified of significant changes.</p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold">10. Contact Information</h2>
                <p>For any questions regarding this agreement, contact our Data Protection Officer:</p>
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
                By using LEXRAG, you acknowledge that you have read, understood, and agreed to this Data Processing
                Agreement.
            </p>
        </div>
    );
};

export default DataProcessingAgreementPage;
