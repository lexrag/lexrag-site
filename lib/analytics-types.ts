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

export interface GraphViewChangeProps {
  from_view: '2d' | '3d';
  to_view: '2d' | '3d';
}

export interface NodeClickProps {
  node_id: string;
  node_type?: string;
  node_labels?: string;
  graph_view?: '2d' | '3d';
  is_expanded?: boolean;
}

export interface NodeExpansionProps {
  node_id: string;
  node_type?: string;
  expansion_type: 'expand' | 'collapse';
  child_node_count?: number;
}

export interface GraphZoomProps {
  zoom_type: 'fit' | 'node' | 'manual';
  target_id?: string;
}

export interface GraphFilterProps {
  filter_type: 'node' | 'link' | 'layer';
  filter_id: string;
  enabled: boolean;
}

export interface QuestionSubmittedProps {
  chat_session_id: string;
  is_new_conversation?: boolean;
  question_length?: number;
  word_count?: number;
  query_complexity?: 'low' | 'medium' | 'high';
}

export interface ConversationLoadedProps {
  thread_id: string;
  messages_count: number;
}

export interface SubscriptionCancelledProps {
  plan_id: string;
  plan_name: string;
  amount: number;
  currency?: string;
}

export interface BaseEventProperties {
  meta?: {
    source?: string;
    [key: string]: any;
  };
  debug_mode?: boolean;
  [key: string]: any;
}

export interface AnalyticsConfig {
  writeKey: string;
  enabled: boolean;
  debug: boolean;
}
