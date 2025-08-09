import { AnalyticsBrowser } from '@segment/analytics-next';


const SEGMENT_WRITE_KEY = process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY || '8MIbGPXtsepP3Fw9BH1Kg27lp3dPTBWe';
const SEGMENT_ENABLED = process.env.NEXT_PUBLIC_SEGMENT_ENABLED !== 'false'; // Default to enabled
const SEGMENT_DEBUG = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_SEGMENT_DEBUG === 'true';

let analyticsSingleton: any = null;
let currentUserId: string | null = null; // Track current user state

export function getAnalytics(): any {
  if (!SEGMENT_ENABLED || !SEGMENT_WRITE_KEY) {
    // Return mock analytics when disabled
    return Promise.resolve([{
      page: () => Promise.resolve(),
      track: () => Promise.resolve(),
      identify: () => Promise.resolve(),
      reset: () => Promise.resolve(),
    }]);
  }

  if (!analyticsSingleton) {
    analyticsSingleton = AnalyticsBrowser.load({
      writeKey: SEGMENT_WRITE_KEY,
    });
  }
  return analyticsSingleton;
}

function getAnonymousUserId(): string {
  return "anonymous";
}

export function getCurrentUserId(): string {
  return currentUserId || getAnonymousUserId();
}

export async function page(props?: Record<string, any>) {
  if (!SEGMENT_ENABLED) return;
  
  const [a] = await getAnalytics();
  const payload = {
    ...(props || {}),
    ...(SEGMENT_DEBUG && { debug_mode: true }),
  };
  await a.page(undefined, payload);
  
  if (SEGMENT_DEBUG) {
    console.log('📄 Page tracked:', { userId: getCurrentUserId(), properties: payload });
  }
}

export async function identify(userId: string) {
  if (!SEGMENT_ENABLED) return;
  
  if (currentUserId === userId) {
    if (SEGMENT_DEBUG) {
      console.log('🔄 Skipping identify - same userId:', userId);
    }
    return;
  }
  
  const [a] = await getAnalytics();
  currentUserId = userId;
  await a.identify(userId);
  
  if (SEGMENT_DEBUG) {
    console.log('👤 User identified:', userId);
  }
}

export async function analyticsReset() {
  if (!SEGMENT_ENABLED) return;
  
  const [client] = await getAnalytics();
  const previousUserId = currentUserId;
  currentUserId = null;
  await client.reset();
  
  console.log(`🔄 Analytics reset: ${previousUserId} → anonymous`);
}

export async function track(event: string, props?: Record<string, any>) {
  if (!SEGMENT_ENABLED) return;
  
  const normalizedEvent = event.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  
  const payload = {
    ...(props || {}),
    meta: { ...(props?.meta || {}), source: 'frontend' },
    ...(SEGMENT_DEBUG && { debug_mode: true }),
  };
  
  const [a] = await getAnalytics();
  await a.track(normalizedEvent, payload);
  
  if (SEGMENT_DEBUG) {
    console.log('📊 Event tracked:', { 
      event: normalizedEvent, 
      userId: getCurrentUserId(), 
      properties: payload 
    });
  }
}

import type {
  GraphViewChangeProps,
  NodeClickProps,
  NodeExpansionProps,
  GraphZoomProps,
  GraphFilterProps,
  QuestionSubmittedProps,
  ConversationLoadedProps,
  SubscriptionCancelledProps,
} from './analytics-types';

export const track_graph_view_changed = (p: GraphViewChangeProps) => 
  track('graph_view_changed', p);

export const track_node_clicked = (p: NodeClickProps) => 
  track('node_clicked', p);

export const track_node_expanded = (p: NodeExpansionProps) => 
  track('node_expanded', p);

export const track_node_collapsed = (p: NodeExpansionProps) => 
  track('node_collapsed', p);

export const track_graph_zoomed = (p: GraphZoomProps) => 
  track('graph_zoomed', p);

export const track_graph_filter_changed = (p: GraphFilterProps) => 
  track('graph_filter_changed', p);

export const track_question_submitted = (p: QuestionSubmittedProps) => 
  track('question_submitted', p);

export const track_conversation_loaded = (p: ConversationLoadedProps) => 
  track('conversation_loaded', p);

export const track_subscription_cancelled = (p: SubscriptionCancelledProps) => 
  track('subscription_cancelled', { currency: 'USD', ...p });


export function getAnalyticsConfig() {
  return {
    writeKey: SEGMENT_WRITE_KEY,
    enabled: SEGMENT_ENABLED,
    debug: SEGMENT_DEBUG,
  };
}
