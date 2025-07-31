const ZOOM_TO_NODE_GRAPH_EVENT = 'ZOOM_TO_NODE_GRAPH_EVENT';

interface ZoomToNodePayload {
    id: string;
    x?: number;
    y?: number;
    z?: number;
    zoomLevel?: number;
    duration?: number;
}

export const zoomToNodeGraph = (payload: ZoomToNodePayload) => {
    if (typeof window === 'undefined') return;

    const event = new CustomEvent(ZOOM_TO_NODE_GRAPH_EVENT, {
        detail: payload,
    });

    window.dispatchEvent(event);
};

export const subscribeToZoomToNodeGraph = (callback: (payload: ZoomToNodePayload) => void) => {
    if (typeof window === 'undefined') return () => {};

    const handler = (event: CustomEvent<ZoomToNodePayload>) => {
        callback(event.detail);
    };

    window.addEventListener(ZOOM_TO_NODE_GRAPH_EVENT, handler as EventListener);

    return () => {
        window.removeEventListener(ZOOM_TO_NODE_GRAPH_EVENT, handler as EventListener);
    };
};
