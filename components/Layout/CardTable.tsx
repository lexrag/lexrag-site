import React from 'react';
import { Card, CardHeader } from '../ui/card';

interface CardTableProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const CardTable = ({ title, className, children }: CardTableProps) => {
  return (
    <Card
      className={`pb-4 shadow-md hover:shadow-lg transition-shadow min-w-full ${className}`}
    >
      <div className="card-header mb-2">
        <h3 className="card-title">{title}</h3>
      </div>

      <div className="card-table scrollable-x-auto pb-3">
        <table className="table align-middle text-sm text-gray-500">
          <tbody>{children}</tbody>
        </table>
      </div>
    </Card>
  );
};

export default CardTable;
