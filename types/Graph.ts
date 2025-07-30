export interface GraphLayer {
    id: string;
    name: string;
    enabled: boolean;
    color: string;
    priority: number;
}

export interface GraphData {
    all_retrieved_nodes?: any;
    all_retrieved_nodes_with_neighbors?: any;
    relevant_retrieved_nodes?: any;
    relevant_context?: any;
}

export interface GraphNodePosition {
    x: number;
    y: number;
    vx?: number;
    vy?: number;
    fx?: number;
    fy?: number;
}

export interface GraphLink {
    source: string | any;
    target: string | any;
    relation?: string;
    relationType?: string;
    weight?: number;
    color?: string;
    id?: string;
}
