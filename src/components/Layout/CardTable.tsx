import React from "react";

interface CardTableProps {
    title: string;
    className?: string;
    children?: React.ReactNode;
}

const CardTable = ({ title, className, children }: CardTableProps) => {
    return (
        <div className={`card pb-4 shadow-md hover:shadow-lg transition-shadow min-w-full ${className}`}>
            <div className="card-header mb-2">
                <h3 className="card-title">{title}</h3>
            </div>

            <div className="card-table scrollable-x-auto pb-3">
                <table className="table align-middle text-sm text-gray-500">
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CardTable;