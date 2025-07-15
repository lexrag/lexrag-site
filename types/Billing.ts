import { Payment } from './PlansTable';

export interface BillingsTableHeaderProps {
    columns: { key: string; label: string; className?: string }[];
    statusOptions: string[];
    paymentMethodOptions: string[];
    status: string;
    paymentMethod: string;
    onStatusChange: (value: string) => void;
    onPaymentMethodChange: (value: string) => void;
}

export interface BillingsTableProps {
    columns: { key: string; label: string; className?: string }[];
}

export interface BillingsTableBodyProps {
    payments: Payment[];
    columns: { key: string; label: string; className?: string }[];
}
