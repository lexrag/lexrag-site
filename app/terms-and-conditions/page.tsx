import Link from 'next/link';

const TermsAndConditionsLinks = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Legal Documents</h1>
            <p className="text-gray-600 mb-4">
                Below are links to important legal documents governing the use of our services.
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li>
                    <Link href="/terms-and-conditions/terms-conditions" className="text-blue-500 underline">
                        Terms & Conditions
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions/privacy-policy" className="text-blue-500 underline">
                        Privacy Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions/refund-cancellation" className="text-blue-500 underline">
                        Refund & Cancellation Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions/cookie-policy" className="text-blue-500 underline">
                        Cookie Policy
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions/data-processing-agreement" className="text-blue-500 underline">
                        Data Processing Agreement
                    </Link>
                </li>
                <li>
                    <Link href="/terms-and-conditions/end-user-license" className="text-blue-500 underline">
                        End User License Agreement (EULA)
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default TermsAndConditionsLinks;
