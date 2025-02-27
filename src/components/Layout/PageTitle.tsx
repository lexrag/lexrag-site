"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PageTitle = ({ className = "" }) => {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);

    const pageTitle = pathSegments.length > 0
        ? pathSegments[pathSegments.length - 1].replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())
        : "Home";

    return (
        <div className={`container-flex w-full pl-[15%] pr-[15%] ${className}`}>
            <div className="border-t border-gray-200 dark:border-coal-100"></div>
            
            <div className="flex items-center justify-between flex-wrap px-5 gap-2 la:gap-5 my-5">
                <div className="flex flex-col gap-1">
                    <h1 className="font-medium text-lg text-gray-900 capitalize">
                        {pageTitle}
                    </h1>
                    
                    <div className="flex items-center gap-1 text-2sm">
                        <Link href="/" className="text-gray-700 hover:text-primary">
                            Home
                        </Link>
                        {pathSegments.map((segment, index) => {
                            const href = "/" + pathSegments.slice(0, index + 1).join("/");

                            return (
                                <div key={href} className="flex items-center">
                                    <span className="text-gray-400 text-sm mx-1">/</span>
                                    <Link
                                        href={href}
                                        className="text-gray-700 hover:text-primary capitalize"
                                    >
                                        {segment.replace(/-/g, " ")}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            
            <div className="border-b border-gray-200 dark:border-coal-100 mb-5 lg:mb-7.5"></div>


        </div>
    );
};

export default PageTitle;