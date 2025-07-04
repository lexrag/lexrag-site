import { Status } from './StatusColor';

export interface Invoice {
    invoice: string;
    status: Status;
    date: string;
    amount: string;
}
