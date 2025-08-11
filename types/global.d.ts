interface VisualViewport extends EventTarget {
    readonly height: number;
    readonly width: number;
    readonly scale: number;
    readonly offsetLeft: number;
    readonly offsetTop: number;
    readonly pageLeft: number;
    readonly pageTop: number;
    onresize: ((this: VisualViewport, ev: Event) => any) | null;
    onscroll: ((this: VisualViewport, ev: Event) => any) | null;
}

interface Window {
    visualViewport?: VisualViewport;
}
