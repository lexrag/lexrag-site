// Billing type is not exported from '@/types/Billing', so we define it here
export interface Billing {
    billing: string;
    status: string;
    date: string;
    due_to: string;
    amount: string;
}

export const BILLINGS: Billing[] = [
    {
        billing: 'INV-001',
        status: 'Paid',
        date: '2021-01-01',
        due_to: '2021-01-10',
        amount: '$100',
    },
    {
        billing: 'INV-002',
        status: 'Pending',
        date: '2021-01-02',
        due_to: '2021-01-12',
        amount: '$200',
    },
    {
        billing: 'INV-003',
        status: 'Failed',
        date: '2021-01-03',
        due_to: '2021-01-13',
        amount: '$300',
    },
    {
        billing: 'INV-004',
        status: 'Failed',
        date: '2021-01-04',
        due_to: '2021-01-14',
        amount: '$400',
    },
    {
        billing: 'INV-005',
        status: 'Paid',
        date: '2021-01-05',
        due_to: '2021-01-15',
        amount: '$500',
    },
    {
        billing: 'INV-006',
        status: 'Paid',
        date: '2021-01-06',
        due_to: '2021-01-16',
        amount: '$600',
    },
    {
        billing: 'INV-007',
        status: 'Paid',
        date: '2021-01-07',
        due_to: '2021-01-17',
        amount: '$700',
    },
    {
        billing: 'INV-008',
        status: 'Paid',
        date: '2021-01-08',
        due_to: '2021-01-18',
        amount: '$800',
    },
];
