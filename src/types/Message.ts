export interface Message {
    id: string;
    content: string;
    direction: "incoming" | "outgoing";
    type?: string | undefined;
}
