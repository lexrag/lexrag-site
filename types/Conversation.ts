export interface Conversation {
    thread_id: string;
    user_id: string;
    title: string;
    updated_at: Date;
    isGenerating?: boolean;
    isTitleGenerating?: boolean;
}
