import { Status } from './StatusColor';

export interface Billing {
    billing: string;
    status: Status;
    date: string;
    amount: string;
    due_to?: string;
}
