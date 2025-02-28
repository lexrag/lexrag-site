import React from "react";

interface CardTableRowProps {
    icon?: string;
    label: string;
    badge?: string;
    badgeColor?: string;
    value?: React.ReactNode;
    action?: React.ReactNode;
}

const CardTableRow = ({ 
    icon, 
    label, 
    badge, 
    badgeColor = "badge-primary", 
    value, 
    action 
}: CardTableRowProps) => {
    return (
        <tr className="border-b border-gray-200">
            <td className="py-3 px-2 text-gray-600 font-normal w-[70px]">
                {icon && (
                    <div className="flex items-center justify-center shrink-0 rounded-full bg-gray-100 border border-gray-300 w-7 h-7">
                        <i className={`ki-filled ${icon} text-sm text-base`} aria-hidden="true"></i>
                    </div>
                )}
            </td>

            <td className="py-3 text-gray-800 font-normal">
                <span className="text-gray-800 truncate">{label}</span>
            </td>

            <td className="py-3 text-gray-800 font-normal">
                {badge && (
                    <span className={`badge badge-sm badge-outline ${badgeColor}`}>
                        {badge}
                    </span>
                )}
            </td>

            <td className="py-3 text-gray-800 font-normal">
                {value}
            </td>

            <td className="py-3 text-center">
                {action}
            </td>
        </tr>
    );
};

export default CardTableRow;