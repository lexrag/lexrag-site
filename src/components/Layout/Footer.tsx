import Link from "next/link";

const Footer = () => {
    return (
        <footer className="footer absolute bottom-0 right-0 w-full">
            <div className="container-fixed">
                <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 py-5">
                    <div className="flex order-2 md:order-1  gap-2 font-normal text-2sm">
                        <span className="text-gray-500">2025 ©</span>
                        <a href="https://keenthemes.com" target="_blank" className="text-gray-600 hover:text-primary">Lexrag Ltd.</a>
                    </div>

                    <nav className="flex order-1 md:order-2 gap-4 font-normal text-2sm text-gray-600">
                        <Link href={"/chat"} className="hover:text-primary">Chat</Link>
                        <Link href={"/"} className="hover:text-primary">Blog</Link>
                        <Link href={"/"} className="hover:text-primary">News</Link>
                        <Link href={"/"} className="hover:text-primary">Pricing</Link>
                        <Link href={"/"} className="hover:text-primary">Contacts</Link>
                    </nav>
                </div>
            </div>
        </footer>

    )
}

export default Footer
