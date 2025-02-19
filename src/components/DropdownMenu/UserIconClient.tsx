"use client"

import {useEffect, useRef, useState} from "react";
import Dropdown from "@/components/DropdownMenu/Dropdown";

interface User {
    // TODO: implement user interface
}

const UserIconClient = ({ user }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="realtive">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="size-[34px] rounded-full inline-flex items-center justify-center text-md font-semibold border border-primary-clarity bg-primary-light text-primary cursor-pointer">
                {user?.first_name?.slice(0, 1)}
            </div>

            {isOpen && (
                <Dropdown user={user} />
            )}
        </div>
    )
}

export default UserIconClient
