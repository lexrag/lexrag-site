export interface UserAnalyticsProfile {
    id: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    userType?: 'standard' | 'admin';
    status?: 'active' | 'inactive';
    isSocialNetworkUser?: boolean;
    isActive?: boolean;
    isEmailTwoFactorEnabled?: boolean;
}

// Graph interaction events
export interface GraphViewChangeProps {
    thread_id: string;
    from_view: '2d' | '3d';
    to_view: '2d' | '3d';
}

export interface NodeClickProps {
    thread_id: string;
    target_id: string;
    node_type?: string;
}

export interface NodeExpansionProps {
    thread_id: string;
    target_id: string;
    by_user: boolean;
}

export interface GraphZoomProps {
    thread_id: string;
    zoom_type: 'canvas' | 'node' | 'pinch' | 'manual' | 'fit';
    scale?: number;
    target_id?: string;
}

export interface GraphFilterProps {
    thread_id: string;
    filter_type: 'node' | 'link' | 'layer';
    filter_id: string;
    enabled: boolean;
}

// Chat and conversation events
export interface QuestionSubmittedProps {
    thread_id?: string;
    length: number;
    has_files?: boolean;
}

export interface ConversationLoadedProps {
    thread_id: string;
    extra_properties?: Record<string, any>;
}

// Copy and content events
export interface MessageCopiedProps {
    thread_id: string;
    message_id: string;
}

export interface ContentCopiedProps {
    content_type: 'answer' | 'cite' | 'code';
    length: number;
}

// Billing and subscription events
export interface SubscriptionCancelledProps {
    reason?: string;
    plan_id?: string;
    plan_name?: string;
    amount?: number;
}

// Feature usage events
export interface FeatureUsedProps {
    feature: string;
    variant?: string;
}

// Error and help events
export interface ErrorOccurredProps {
    error_type: string;
    error_message?: string;
    context?: string;
}

export interface HelpRequestedProps {
    help_type: string;
    context?: string;
}

// Search events
export interface SearchPerformedProps {
    query: string;
    results_count: number;
    search_type?: string;
}

// File events
export interface FileUploadedProps {
    file_type: string;
    file_size: number;
    success: boolean;
}

export interface DownloadInitiatedProps {
    content_type: string;
    format?: string;
}

// Share events
export interface ShareActionProps {
    content_type: string;
    share_method: string;
    success: boolean;
}

// Preference events
export interface PreferenceChangedProps {
    preference: string;
    old_value?: any;
    new_value: any;
}

// Tutorial and onboarding events
export interface TutorialStepProps {
    tutorial_name: string;
    step_number: number;
    total_steps: number;
}

export interface OnboardingCompletedProps {
    onboarding_type: string;
    steps_completed: number;
    time_spent_ms: number;
}

// Content time tracking
export interface ContentTimeSpentProps {
    area_id: string;
    spent_ms: number;
    is_final: boolean;
    [key: string]: any;
}

// Base event properties (common to all events)
export interface BaseEventProperties {
    meta?: {
        source?: string;
        [key: string]: any;
    };
    debug_mode?: boolean;
    marketing?: Record<string, any>;
    [key: string]: any;
}

export interface AnalyticsConfig {
    writeKey: string;
    enabled: boolean;
    debug: boolean;
}
