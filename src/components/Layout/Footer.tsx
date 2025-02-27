import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer 
            className="footer w-full mt-auto"
            id="footer"
        >
            <div className="container-fixed">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
                    <div className="flex order-2 md:order-1 gap-2 font-normal text-2sm">
                        <span className="text-gray-600 dark:text-gray-600">© { currentYear }</span>
                        <span className="text-gray-600 dark:text-gray-600">LEXRAG PTE LTD.</span>
                    </div>

                    <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm">
                        <Link href={"/chat"} className="text-gray-400 dark:text-gray-300 hover:text-primary">
                            Chat
                        </Link>
                        <Link href={"/dashboard"} className="text-gray-600 dark:text-gray-300 hover:text-primary">
                            Dashboard
                        </Link>
                        <Link href={"/services"} className="text-gray-600 dark:text-gray-300 hover:text-primary">
                            Services
                        </Link>
                        <Link href={"/company"} className="text-gray-600 dark:text-gray-300 hover:text-primary">
                            Company
                        </Link>
                        <Link href={"/terms-and-conditions"} className="text-gray-600 dark:text-gray-300 hover:text-primary">
                            Legal Docs
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;