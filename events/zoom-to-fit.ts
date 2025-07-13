const ZOOM_TO_FIT_GRAPH_EVENT = 'ZOOM_TO_FIT_GRAPH_EVENT';

export const zoomToFitGraph = () => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(new CustomEvent(ZOOM_TO_FIT_GRAPH_EVENT));
};

export const subscribeToZoomToFitGraph = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};

    const handler = () => callback();
    window.addEventListener(ZOOM_TO_FIT_GRAPH_EVENT, handler);

    return () => {
        window.removeEventListener(ZOOM_TO_FIT_GRAPH_EVENT, handler);
    };
};
