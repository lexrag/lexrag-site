import React from "react";

interface CardTableRowProps {
    label: string;
    value: React.ReactNode;
    action?: React.ReactNode;
}

const CardTableRow = ({ label, value, action }: CardTableRowProps) => {
    return (
        <tr>
            <td className="py-3 text-gray-600 font-normal">{label}</td>
            <td className="py-3 text-gray-800 font-normal">{value}</td>
            <td className="py-3 text-center">{action}</td>
        </tr>
    );
};

export default CardTableRow;
