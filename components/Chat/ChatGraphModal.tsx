'use client';

import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDirection } from '@radix-ui/react-direction';
import { GraphData, GraphLayer, GraphLinkFilter, GraphNodeFilter } from '@/types/Graph';
import { CardData } from '@/types/Chat';
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Globe, Layers, Fullscreen, Link } from 'lucide-react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import ChatGraph2D from './ChatGraph2D';
import ChatGraph3D from './ChatGraph3D';
import { Button } from '../ui/button';

interface ChatGraphModalProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    graphView: string;
    setGraphView: (view: string) => void;
    graphLayers: GraphLayer[];
    setGraphLayers: Dispatch<SetStateAction<GraphLayer[]>>;
    data: GraphData;
    graphLinkFilters: GraphLinkFilter[];
    setGraphLinkFilters: Dispatch<SetStateAction<GraphLinkFilter[]>>;
    graphNodeFilters: GraphNodeFilter[];
    setGraphNodeFilters: Dispatch<SetStateAction<GraphNodeFilter[]>>;
    handleCardData: Dispatch<SetStateAction<any>>;
    cardData: CardData;
}

const ChatGraphModal = ({ 
    open, 
    onOpenChange, 
    graphView, 
    setGraphView, 
    graphLayers, 
    setGraphLayers, 
    data, 
    graphLinkFilters,
    setGraphLinkFilters,
    graphNodeFilters,
    setGraphNodeFilters,
    handleCardData,
    cardData 
}: ChatGraphModalProps) => {
    const direction = useDirection();
    const [scrollToCardId, setScrollToCardId] = useState<string>('');
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());
    const [showNodeLabels, setShowNodeLabels] = useState<boolean>(graphView === '2d');

    // Update showNodeLabels when graphView changes
    useEffect(() => {
        setShowNodeLabels(graphView === '2d');
    }, [graphView]);

    const nodeRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const accordionContainerRef = useRef<HTMLDivElement | null>(null);

    const getGroupKey = (nodeId: string) => {
        if (nodeId.includes('lawnet.com/openlaw/cases/citation/')) {
            const match = nodeId.match(/cases\/citation\/([^#]+)/);
            return match ? decodeURIComponent(match[1]) : nodeId;
        } else if (nodeId.includes('sso.agc.gov.sg/Act/')) {
            const match = nodeId.match(/\/Act\/([^?]+)/);
            return match ? match[1] : nodeId;
        } else if (nodeId.includes('sso.agc.gov.sg/SL/')) {
            const match = nodeId.match(/\/SL\/([^?]+)/);
            if (match) {
                const slCode = match[1];
                const baseActMatch = slCode.match(/^([^-]+)/);
                return baseActMatch ? baseActMatch[1] : slCode;
            }
            return nodeId;
        }
        return nodeId;
    };

    const findGroupByNodeId = useCallback(
        (nodeId: string) => {
            if (!cardData.nodes) return null;

            const node = cardData.nodes.find((n) => n.id === nodeId);
            if (!node) return null;

            return getGroupKey(node.id);
        },
        [cardData.nodes],
    );

    const accordionTriggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    useEffect(() => {
        if (!scrollToCardId || !cardData.nodes) return;

        const scrollToCard = async () => {
            const groupKey = findGroupByNodeId(scrollToCardId);
            if (!groupKey) return;

            setOpenAccordionItems((prev) => {
                if (!prev.includes(groupKey)) {
                    return [...prev, groupKey];
                }
                return prev;
            });

            setSelectedItem(scrollToCardId);
            setSelectedGroup(groupKey);

            // Find the target node in cardData and trigger zoom
            const targetNode = cardData.nodes.find((node) => node.id === scrollToCardId);
            if (targetNode && targetNode.x !== undefined && targetNode.y !== undefined) {
                // Trigger zoom to node for both 2D and 3D graphs
                zoomToNodeGraph({
                    id: scrollToCardId,
                    x: targetNode.x,
                    y: targetNode.y,
                    z: targetNode.z,
                    duration: 1000,
                });
            }

            setTimeout(() => {
                let targetElement: HTMLElement | null = nodeRefs.current[scrollToCardId];

                if (!targetElement) {
                    targetElement =
                        accordionTriggerRefs.current[scrollToCardId] || accordionTriggerRefs.current[groupKey];
                }

                if (targetElement && accordionContainerRef.current) {
                    const containerRect = accordionContainerRef.current.getBoundingClientRect();
                    const targetRect = targetElement.getBoundingClientRect();

                    const scrollTop =
                        accordionContainerRef.current.scrollTop +
                        (targetRect.top - containerRect.top) -
                        containerRect.height / 2 +
                        targetRect.height / 2;

                    accordionContainerRef.current.scrollTo({
                        top: scrollTop,
                        behavior: 'smooth',
                    });
                }
            }, 100);
        };

        scrollToCard();
    }, [scrollToCardId, cardData.nodes, findGroupByNodeId]);

    const parentNodes = useMemo(() => {
        if (!cardData.nodes || cardData.nodes.length === 0) {
            return {};
        }

        const parents: { [key: string]: any } = {};

        cardData.nodes.forEach((node) => {
            if (node.labels?.includes('Act') || node.labels?.includes('CaseLaw')) {
                const groupKey = getGroupKey(node.id);
                parents[groupKey] = node;
            }
        });

        return parents;
    }, [cardData.nodes]);

    const getGroupInfo = (groupKey: string, nodes: any[]) => {
        const parentNode = parentNodes[groupKey];

        if (parentNode) {
            if (parentNode.labels?.includes('CaseLaw')) {
                return {
                    displayName: parentNode.content || groupKey,
                    type: 'case',
                    citation: parentNode.neutralCitation,
                    date: parentNode.date,
                };
            } else if (parentNode.labels?.includes('Act')) {
                return {
                    displayName: parentNode.content || groupKey,
                    type: 'act',
                    citation: null,
                    date: parentNode.date,
                };
            }
        }

        const caseNode = nodes.find((node) => node.labels?.includes('CaseLaw'));
        if (caseNode) {
            return {
                displayName: caseNode.content || groupKey,
                type: 'case',
                citation: caseNode.neutralCitation,
                date: caseNode.date,
            };
        }

        const actNode = nodes.find((node) => node.labels?.includes('Act'));
        if (actNode) {
            return {
                displayName: actNode.content || groupKey,
                type: 'act',
                citation: null,
                date: actNode.date,
            };
        }

        const firstNode = nodes[0];
        if (firstNode && firstNode.id.includes('sso.agc.gov.sg')) {
            let type = 'custom';
            let displayName = firstNode.content || groupKey;

            const hasActNode = nodes.some((node) => node.id.includes('/Act/'));
            const hasSLNode = nodes.some((node) => node.id.includes('/SL/'));

            if (hasActNode || hasSLNode) {
                type = 'act';

                const actNodeInGroup = nodes.find((node) => node.id.includes('/Act/'));
                if (actNodeInGroup) {
                    displayName = actNodeInGroup.content || `Act ${groupKey}`;
                } else if (firstNode.id.includes('/SL/')) {
                    displayName =
                        firstNode.content?.replace('Regulations', 'Act').replace(/\s+\d{4}$/, ' 2021') ||
                        `Act ${groupKey}`;
                }
            }

            return {
                displayName,
                type,
                citation: null,
                date: firstNode.date || null,
            };
        }

        return {
            displayName: firstNode?.labels?.[0] || firstNode?.content || groupKey,
            type: 'custom',
            citation: null,
            date: null,
        };
    };

    const getParagraphNumber = (nodeId: string) => {
        if (nodeId.includes('#[')) {
            const match = nodeId.match(/#\[(\d+)\]/);
            return match ? match[1] : null;
        }
        return null;
    };

    const groupedNodes = useMemo(() => {
        if (!cardData.nodes || cardData.nodes.length === 0) {
            return {};
        }

        const groups: { [key: string]: any[] } = {};
        const parentNodes: { [key: string]: any } = {};

        cardData.nodes.forEach((node) => {
            const groupKey = getGroupKey(node.id);

            if (!groups[groupKey]) {
                groups[groupKey] = [];
                parentNodes[groupKey] = null;
            }

            if (node.labels?.includes('Act') || node.labels?.includes('CaseLaw')) {
                parentNodes[groupKey] = node;
            } else {
                if (node.labels?.includes('PartOfTheLegislation')) {
                    if (node.id.includes('?') || node.id.includes('#') || node.id.includes('/SL/')) {
                        groups[groupKey].push(node);
                    }
                } else {
                    groups[groupKey].push(node);
                }
            }
        });

        const filteredGroups: { [key: string]: any[] } = {};
        Object.keys(groups).forEach((groupKey) => {
            const hasParent = parentNodes[groupKey] !== null;
            const hasChildren = groups[groupKey].length > 0;

            if (hasParent || hasChildren) {
                filteredGroups[groupKey] = groups[groupKey];
            }
        });

        return filteredGroups;
    }, [cardData.nodes]);

    const handleGroupClick = (groupKey: string) => {
        const isCurrentlySelected = selectedItem === groupKey;
        const isCurrentlyOpen = openAccordionItems.includes(groupKey);
        
        setSelectedItem(isCurrentlySelected ? null : groupKey);
        setSelectedGroup(isCurrentlySelected ? null : groupKey);

        setOpenAccordionItems((prev) => {
            if (isCurrentlyOpen) {
                return prev.filter(item => item !== groupKey);
            } else {
                return [...prev, groupKey];
            }
        });

        if (!isCurrentlySelected) {
            setScrollToCardId(groupKey);

            const parentNode = parentNodes[groupKey];
            if (parentNode && parentNode.x !== undefined && parentNode.y !== undefined) {
                zoomToNodeGraph({
                    id: parentNode.id,
                    x: parentNode.x,
                    y: parentNode.y,
                });
            }
        }
    };

    const handleNodeClick = (nodeId: string, node: any) => {
        const nodeGroupKey = getGroupKey(node.id);
        setSelectedItem(nodeId);
        setSelectedGroup(nodeGroupKey);

        const isParentNode = node.labels?.includes('Act') || node.labels?.includes('CaseLaw');

        if (isParentNode) {
            setScrollToCardId(nodeGroupKey);
        } else {
            setScrollToCardId(nodeId);
        }

        if (node.x !== undefined && node.y !== undefined) {
            zoomToNodeGraph({
                id: nodeId,
                x: node.x,
                y: node.y,
            });
        }
    };

    const formatLegalPath = (legalPath: string) => {
        if (!legalPath) return '';

        const parts = legalPath.split(' -> ').map((part) => part.trim());
        const pathParts = parts.slice(1).map((part) => part.replace(/-$/, ''));

        if (pathParts.length === 0) return '';

        const [first, ...rest] = pathParts;
        if (rest.length === 0) return first;

        return `${first}(${rest.join(')(')})`;
    };

    const getNodeDisplayInfo = (node: any) => {
        const paragraphNum = getParagraphNumber(node.id);
        let title = node.labels?.[0] || 'Node';

        if (paragraphNum) {
            title = `§ ${paragraphNum}`;
        } else if (node.id.includes('/SL/') && node.labels?.includes('PartOfTheLegislation')) {
            title = node.heading ? `${node.heading}` : `Regulation ${formatLegalPath(node.legalPath) || ''}`;
        } else if (node.id.includes('/SL/') && node.labels?.includes('Resource')) {
            title = 'Subsidiary Legislation';
        } else if (node.labels?.includes('PartOfTheLegislation')) {
            title = formatLegalPath(node.legalPath) || node.labels?.[0] || 'Section';
        }

        let subtitle = null;
        const subtitleParts = [];

        if (node.score !== undefined) {
            subtitleParts.push(`Score: ${node.score.toFixed(3)}`);
        }

        if (subtitleParts.length > 0) {
            subtitle = subtitleParts.join(' • ');
        }

        return {
            title,
            subtitle,
            citation: node.neutralCitation || null,
            content: node.content || '',
            topics: node.topics || [],
            concepts: node.concepts || [],
            functionalObject: node.functionalObject || null,
            functionalRole: node.functionalRole || null,
        };
    };

    const renderBadges = (items: string[], type: 'topic' | 'concept') => {
        if (!items || items.length === 0) return null;

        const getBadgeColor = (type: string) => {
            switch (type) {
                case 'topic':
                    return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-700';
                case 'concept':
                    return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-700';
                default:
                    return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600';
            }
        };

        const getBadgeTitleColor = (type: string) => {
            switch (type) {
                case 'topic':
                    return 'text-green-800 dark:text-green-200';
                case 'concept':
                    return 'text-blue-800 dark:text-blue-200';
                default:
                    return 'text-gray-800 dark:text-gray-200';
            }
        }

        return (
            <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-0.5 text-xs font-medium ${getBadgeTitleColor(type)}`}>
                    {`legal ${type}s`}
                </span>
                <div className="flex flex-wrap gap-1 mb-2">

                {items.map((item, index) => (
                    <span
                    key={index}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getBadgeColor(type)}`}
                    >
                        {item}
                    </span>
                ))}
                </div>
            </div>
        );
    };

    const handleLinkFilter = (filterId: string) => {
        setGraphLinkFilters((prevFilters) =>
            prevFilters.map((filter) => (filter.id === filterId ? { ...filter, enabled: !filter.enabled } : filter)),
        );
    };

    const handleAllLinkFilters = (enabled: boolean) => {
        setGraphLinkFilters((prevFilters) => prevFilters.map((filter) => ({ ...filter, enabled })));
    };

    const handleNodeFilter = (filterId: string) => {
        setGraphNodeFilters((prevFilters) =>
            prevFilters.map((filter) => (filter.id === filterId ? { ...filter, enabled: !filter.enabled } : filter)),
        );
    };

    const handleAllNodeFilters = (enabled: boolean) => {
        setGraphNodeFilters((prevFilters) => prevFilters.map((filter) => ({ ...filter, enabled })));
    };

    const modalDimensions = useMemo(() => {
        const modalWidth = window.innerWidth * 0.95;
        const modalHeight = window.innerHeight * 0.9;
        
        const hasSidebar = !!data && Object.entries(groupedNodes).length > 0 && window.innerWidth >= 768;
        const sidebarWidth = hasSidebar ? Math.max(modalWidth * 0.4, 300) : 0;
        const graphWidth = Math.max(modalWidth - sidebarWidth, 400);
        const graphHeight = modalHeight;
        
        return {
            modalWidth,
            modalHeight,
            graphWidth,
            graphHeight,
            sidebarWidth,
            hasSidebar
        };
    }, [data, groupedNodes]);

    useEffect(() => {
        const handleResize = () => {
            setScrollToCardId(prev => prev);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [modalDimensions]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[95vw] h-[90vh] max-w-none p-0 border-0" dir={direction}>
                <DialogTitle className="sr-only">Chat Graph</DialogTitle>
                <Tabs value={graphView} onValueChange={setGraphView} className="w-full h-full flex flex-col border-0 p-0">
                    <div className="flex-1 flex overflow-hidden p-0">
                        <div 
                            className="h-full relative overflow-hidden"
                            style={{ width: modalDimensions.graphWidth }}
                        >
                            <TabsContent value="2d" className="w-full h-full m-0 data-[state=inactive]:hidden border-0 p-0">
                                <div className="relative w-full h-full">
                                    <ChatGraph2D 
                                        height={modalDimensions.graphHeight}
                                        width={modalDimensions.graphWidth}
                                        data={data} 
                                        layers={graphLayers} 
                                        handleCardData={handleCardData} 
                                        handleScrollToCardId={setScrollToCardId}
                                        expandedNodes={expandedNodes}
                                        setExpandedNodes={setExpandedNodes}
                                        nodeHierarchy={nodeHierarchy}
                                        setNodeHierarchy={setNodeHierarchy}
                                        expandedData={expandedData}
                                        setExpandedData={setExpandedData}
                                        loadingNodes={loadingNodes}
                                        setLoadingNodes={setLoadingNodes}
                                        linkFilters={graphLinkFilters}
                                        setLinkFilters={setGraphLinkFilters}
                                        nodeFilters={graphNodeFilters}
                                        setNodeFilters={setGraphNodeFilters}
                                        showNodeLabels={showNodeLabels}
                                    />
                                    
                                    {/* Control buttons overlay for 2D */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                                        <TabsList className="grid w-fit grid-cols-2 bg-background/80 backdrop-blur-sm border border-input shadow-sm">
                                            <TabsTrigger value="2d" title="Switch to 2D Graph View">2D</TabsTrigger>
                                            <TabsTrigger value="3d" title="Switch to 3D Graph View">3D</TabsTrigger>
                                        </TabsList>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div 
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Graph Layers"
                                                >
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {graphLayers.map(({ id, enabled, name }) => {
                                                    const enabledLayersCount = graphLayers.filter(
                                                        (layer) => layer.enabled,
                                                    ).length;
                                                    const isLastEnabled = enabled && enabledLayersCount === 1;

                                                    return (
                                                        <DropdownMenuCheckboxItem
                                                            key={id}
                                                            checked={enabled}
                                                            onSelect={(event) => event.preventDefault()}
                                                            onCheckedChange={(checked) => {
                                                                if (!checked && isLastEnabled) return;

                                                                setGraphLayers((prevLayers) =>
                                                                    prevLayers.map((layer) =>
                                                                        layer.id === id
                                                                            ? { ...layer, enabled: checked }
                                                                            : layer,
                                                                    ),
                                                                );
                                                            }}
                                                            disabled={isLastEnabled}
                                                        >
                                                            {name}
                                                        </DropdownMenuCheckboxItem>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Link Filters"
                                                >
                                                    <Link className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-80 max-h-64 overflow-y-auto"
                                                align="end"
                                                sideOffset={5}
                                            >
                                                <DropdownMenuLabel className="flex justify-between items-center py-2">
                                                    <span>Link Filters</span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="flex gap-2 p-2">
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllLinkFilters(true);
                                                        }}
                                                    >
                                                        All
                                                    </Button>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllLinkFilters(false);
                                                        }}
                                                    >
                                                        None
                                                    </Button>
                                                </div>
                                                <DropdownMenuSeparator />
                                                <div className="max-h-48 overflow-y-auto">
                                                    {graphLinkFilters.map((filter) => (
                                                        <div
                                                            key={filter.id}
                                                            className="flex items-center gap-2 p-2 mx-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleLinkFilter(filter.id);
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filter.enabled}
                                                                onChange={() => {}}
                                                                className="rounded"
                                                            />
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{ backgroundColor: filter.color }}
                                                            />
                                                            <span className="text-sm">{filter.label}</span>
                                                            <span className="text-xs text-gray-500 ml-auto">
                                                                ({filter.count})
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Node Filters"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-80 max-h-64 overflow-y-auto"
                                                align="end"
                                                sideOffset={5}
                                            >
                                                <DropdownMenuLabel className="flex justify-between items-center py-2">
                                                    <span>Node Filters</span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="flex gap-2 p-2">
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllNodeFilters(true);
                                                        }}
                                                    >
                                                        All
                                                    </Button>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllNodeFilters(false);
                                                        }}
                                                    >
                                                        None
                                                    </Button>
                                                </div>
                                                <DropdownMenuSeparator />
                                                <div className="max-h-48 overflow-y-auto">
                                                    {graphNodeFilters.map((filter) => (
                                                        <div
                                                            key={filter.id}
                                                            className="flex items-center gap-2 p-2 mx-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleNodeFilter(filter.id);
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filter.enabled}
                                                                onChange={() => handleNodeFilter(filter.id)}
                                                                className="cursor-pointer"
                                                                style={{ accentColor: filter.color }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <div
                                                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                                                style={{ backgroundColor: filter.color }}
                                                            />
                                                            <span className="flex-1 text-sm text-gray-900 dark:text-white">
                                                                {filter.label}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                                                                {filter.count}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div
                                            onClick={() => setShowNodeLabels(!showNodeLabels)}
                                            className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer shadow-sm ${
                                                showNodeLabels
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-background/80 backdrop-blur-sm border-input hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                            title={showNodeLabels ? 'Hide Node Labels' : 'Show Node Labels'}
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                            onClick={() => zoomToFitGraph()}
                                            title="Zoom to Fit All Nodes"
                                        >
                                            <Fullscreen className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="3d" className="w-full h-full m-0 data-[state=inactive]:hidden border-0 p-0">
                                <div className="relative w-full h-full">
                                    <ChatGraph3D 
                                        height={modalDimensions.graphHeight}
                                        width={modalDimensions.graphWidth}
                                        data={data} 
                                        layers={graphLayers} 
                                        handleCardData={handleCardData} 
                                        handleScrollToCardId={setScrollToCardId}
                                        isOrbitEnabled={isOrbitEnabled}
                                        setIsOrbitEnabled={setIsOrbitEnabled}
                                        expandedNodes={expandedNodes}
                                        setExpandedNodes={setExpandedNodes}
                                        nodeHierarchy={nodeHierarchy}
                                        setNodeHierarchy={setNodeHierarchy}
                                        expandedData={expandedData}
                                        setExpandedData={setExpandedData}
                                        loadingNodes={loadingNodes}
                                        setLoadingNodes={setLoadingNodes}
                                        linkFilters={graphLinkFilters}
                                        setLinkFilters={setGraphLinkFilters}
                                        nodeFilters={graphNodeFilters}
                                        setNodeFilters={setGraphNodeFilters}
                                        showNodeLabels={showNodeLabels}
                                    />
                                    
                                    {/* Control buttons overlay for 3D */}
                                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                                        <TabsList className="grid w-fit grid-cols-2 bg-background/80 backdrop-blur-sm border border-input shadow-sm">
                                            <TabsTrigger value="2d" title="Switch to 2D Graph View">2D</TabsTrigger>
                                            <TabsTrigger value="3d" title="Switch to 3D Graph View">3D</TabsTrigger>
                                        </TabsList>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div 
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Graph Layers"
                                                >
                                                    <Layers className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48">
                                                {graphLayers.map(({ id, enabled, name }) => {
                                                    const enabledLayersCount = graphLayers.filter(
                                                        (layer) => layer.enabled,
                                                    ).length;
                                                    const isLastEnabled = enabled && enabledLayersCount === 1;

                                                    return (
                                                        <DropdownMenuCheckboxItem
                                                            key={id}
                                                            checked={enabled}
                                                            onSelect={(event) => event.preventDefault()}
                                                            onCheckedChange={(checked) => {
                                                                if (!checked && isLastEnabled) return;

                                                                setGraphLayers((prevLayers) =>
                                                                    prevLayers.map((layer) =>
                                                                        layer.id === id
                                                                            ? { ...layer, enabled: checked }
                                                                            : layer,
                                                                    ),
                                                                );
                                                            }}
                                                            disabled={isLastEnabled}
                                                        >
                                                            {name}
                                                        </DropdownMenuCheckboxItem>
                                                    );
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Link Filters"
                                                >
                                                    <Link className="h-4 w-4" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-80 max-h-64 overflow-y-auto"
                                                align="end"
                                                sideOffset={5}
                                            >
                                                <DropdownMenuLabel className="flex justify-between items-center py-2">
                                                    <span>Link Filters</span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="flex gap-2 p-2">
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllLinkFilters(true);
                                                        }}
                                                    >
                                                        All
                                                    </Button>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllLinkFilters(false);
                                                        }}
                                                    >
                                                        None
                                                    </Button>
                                                </div>
                                                <DropdownMenuSeparator />
                                                <div className="max-h-48 overflow-y-auto">
                                                    {graphLinkFilters.map((filter) => (
                                                        <div
                                                            key={filter.id}
                                                            className="flex items-center gap-2 p-2 mx-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleLinkFilter(filter.id);
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filter.enabled}
                                                                onChange={() => handleLinkFilter(filter.id)}
                                                                className="cursor-pointer"
                                                                style={{ accentColor: filter.color }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <div
                                                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                                                style={{ backgroundColor: filter.color }}
                                                            />
                                                            <span className="flex-1 text-sm text-gray-900 dark:text-white">
                                                                {filter.label}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                                                                {filter.count}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                                    title="Toggle Node Filters"
                                                >
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                    </svg>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-80 max-h-64 overflow-y-auto"
                                                align="end"
                                                sideOffset={5}
                                            >
                                                <DropdownMenuLabel className="flex justify-between items-center py-2">
                                                    <span>Node Filters</span>
                                                </DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <div className="flex gap-2 p-2">
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllNodeFilters(true);
                                                        }}
                                                    >
                                                        All
                                                    </Button>
                                                    <Button
                                                        className="flex-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleAllNodeFilters(false);
                                                        }}
                                                    >
                                                        None
                                                    </Button>
                                                </div>
                                                <DropdownMenuSeparator />
                                                <div className="max-h-48 overflow-y-auto">
                                                    {graphNodeFilters.map((filter) => (
                                                        <div
                                                            key={filter.id}
                                                            className="flex items-center gap-2 p-2 mx-1 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                handleNodeFilter(filter.id);
                                                            }}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={filter.enabled}
                                                                onChange={() => handleNodeFilter(filter.id)}
                                                                className="cursor-pointer"
                                                                style={{ accentColor: filter.color }}
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                            <div
                                                                className="w-3 h-3 rounded-sm flex-shrink-0"
                                                                style={{ backgroundColor: filter.color }}
                                                            />
                                                            <span className="flex-1 text-sm text-gray-900 dark:text-white">
                                                                {filter.label}
                                                            </span>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded flex-shrink-0">
                                                                {filter.count}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <div
                                            onClick={() => setIsOrbitEnabled(!isOrbitEnabled)}
                                            className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer shadow-sm ${
                                                isOrbitEnabled
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-background/80 backdrop-blur-sm border-input hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                            title={isOrbitEnabled ? 'Disable Camera Orbit' : 'Enable Camera Orbit'}
                                        >
                                            <Globe className={`h-4 w-4 ${isOrbitEnabled ? 'animate-spin' : ''}`} />
                                        </div>
                                        <div
                                            onClick={() => setShowNodeLabels(!showNodeLabels)}
                                            className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer shadow-sm ${
                                                showNodeLabels
                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                    : 'bg-background/80 backdrop-blur-sm border-input hover:bg-accent hover:text-accent-foreground'
                                            }`}
                                            title={showNodeLabels ? 'Hide Node Labels' : 'Show Node Labels'}
                                        >
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </svg>
                                        </div>
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background/80 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-sm"
                                            onClick={() => zoomToFitGraph()}
                                            title="Zoom to Fit All Nodes"
                                        >
                                            <Fullscreen className="h-4 w-4" />
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>

                        {modalDimensions.hasSidebar && (
                            <div 
                                className="h-full border-l flex flex-col bg-background relative z-10 pt-4"
                                style={{ width: modalDimensions.sidebarWidth }}
                            >
                                <div className="px-4 py-3 border-b flex items-center justify-between">
                                    <h3 className="font-semibold text-sm text-muted-foreground">Sources</h3>
                                    <button
                                        onClick={() => onOpenChange(false)}
                                        className="flex items-center justify-center w-6 h-6 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                        title="Close modal"
                                    >
                                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <Accordion
                                        type="multiple"
                                        className="w-full h-full overflow-y-auto"
                                        value={openAccordionItems}
                                        onValueChange={setOpenAccordionItems}
                                        ref={accordionContainerRef}
                                    >
                                        {Object.entries(groupedNodes).map(([groupKey, nodes]) => {
                                            const allGroupNodes =
                                                cardData.nodes?.filter((node) => {
                                                    if (node.labels?.includes('PartOfTheLegislation')) return false;

                                                    if (getGroupKey(node.id) !== groupKey) return false;

                                                    const hasQueryOrFragment =
                                                        node.id.includes('?') || node.id.includes('#');
                                                    if (
                                                        !hasQueryOrFragment &&
                                                        (node.id.includes('/Act/') || node.id.includes('/SL/'))
                                                    ) {
                                                        return (
                                                            node.labels?.includes('Act') || node.labels?.includes('CaseLaw')
                                                        );
                                                    }

                                                    return true;
                                                }) || [];

                                            const groupInfo = getGroupInfo(groupKey, allGroupNodes);

                                            if (groupInfo.type === 'custom') {
                                                return null;
                                            }

                                            if (
                                                nodes.length === 0 &&
                                                !allGroupNodes.some(
                                                    (node) =>
                                                        node.labels?.includes('CaseLaw') || node.labels?.includes('Act'),
                                                )
                                            ) {
                                                return null;
                                            }

                                            const getTypeBadgeColor = (type: string) => {
                                                switch (type) {
                                                    case 'case':
                                                        return 'bg-blue-100 text-blue-800 border-blue-200';
                                                    case 'act':
                                                        return 'bg-green-100 text-green-800 border-green-200';
                                                    case 'subsidiary':
                                                        return 'bg-orange-100 text-orange-800 border-orange-200';
                                                    default:
                                                        return 'bg-gray-100 text-gray-800 border-gray-200';
                                                }
                                            };

                                            const getTypeLabel = (type: string) => {
                                                switch (type) {
                                                    case 'case':
                                                        return 'Case';
                                                    case 'act':
                                                        return 'Act';
                                                    case 'subsidiary':
                                                        return 'SL';
                                                    default:
                                                        return 'Custom';
                                                }
                                            };

                                            return (
                                                <AccordionItem
                                                    key={groupKey}
                                                    value={groupKey}
                                                    className={`transition-all duration-300 pr-4${
                                                        selectedItem === groupKey
                                                            ? 'border-l-2 border-l-primary bg-primary/10'
                                                            : selectedGroup === groupKey
                                                              ? 'border-l-2 border-l-primary/70 bg-primary/5'
                                                              : 'hover:bg-muted/30'
                                                    }`}
                                                >
                                                    <AccordionTrigger className="hover:no-underline px-4">
                                                        <div className="text-left flex items-center gap-2 w-full">
                                                            <div 
                                                                className="flex-1 min-w-0 cursor-pointer"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleGroupClick(groupKey);
                                                                }}
                                                                title={`Click to select and zoom to ${groupInfo.displayName}`}
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span
                                                                        className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getTypeBadgeColor(groupInfo.type)}`}
                                                                    >
                                                                        {getTypeLabel(groupInfo.type)}
                                                                    </span>
                                                                    <span className="text-sm text-muted-foreground">
                                                                        ({nodes.length} node{nodes.length !== 1 ? 's' : ''})
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={`font-semibold transition-colors ${
                                                                        selectedItem === groupKey
                                                                            ? 'text-primary'
                                                                            : selectedGroup === groupKey
                                                                              ? 'text-primary/80'
                                                                              : ''
                                                                    }`}
                                                                >
                                                                    {groupInfo.displayName}
                                                                </div>
                                                                {groupInfo.citation && (
                                                                    <div className="text-xs text-muted-foreground mt-1">
                                                                        {groupInfo.citation}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="space-y-3 px-4 pt-2">
                                                        {nodes.length === 0 ? (
                                                            <div className="text-sm text-muted-foreground italic">
                                                                No detailed nodes available
                                                            </div>
                                                        ) : (
                                                            nodes.map((node: any) => {
                                                                const nodeInfo = getNodeDisplayInfo(node);
                                                                return (
                                                                    <div
                                                                        key={node.id}
                                                                        ref={(el) => {
                                                                            nodeRefs.current[node.id] = el;
                                                                        }}
                                                                        className={`border-l-2 pl-6 pr-2 py-2 cursor-pointer transition-all duration-200 ${
                                                                            selectedItem === node.id
                                                                                ? 'bg-primary/15 border-l-primary shadow-sm scale-[1.02]'
                                                                                : 'border-muted hover:bg-muted/20 hover:border-l-muted-foreground/50'
                                                                        }`}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleNodeClick(node.id, node);
                                                                        }}
                                                                        title={`Click to select and zoom to ${nodeInfo.title}`}
                                                                    >
                                                                        <div className="flex items-start gap-2 mb-2">
                                                                            {node.layerColor && (
                                                                                <div
                                                                                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                                                                                    style={{
                                                                                        backgroundColor: node.layerColor,
                                                                                    }}
                                                                                />
                                                                            )}
                                                                            <div className="flex-1 min-w-0">
                                                                                <div className="flex justify-between items-center gap-2 mb-1">
                                                                                    <div
                                                                                        className={`font-medium text-sm transition-colors ${
                                                                                            selectedItem === node.id
                                                                                                ? 'text-primary'
                                                                                                : ''
                                                                                        }`}
                                                                                    >
                                                                                        {nodeInfo.title}
                                                                                    </div>

                                                                                    {(nodeInfo.subtitle ||
                                                                                        nodeInfo.citation) && (
                                                                                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                                                                                            {nodeInfo.subtitle && (
                                                                                                <span>
                                                                                                    {nodeInfo.subtitle}
                                                                                                </span>
                                                                                            )}
                                                                                            {nodeInfo.citation && (
                                                                                                <span>
                                                                                                    — {nodeInfo.citation}
                                                                                                </span>
                                                                                            )}
                                                                                        </div>
                                                                                    )}
                                                                                </div>
                                                                                <div className='flex gap-1'>
                                                                                {/* Functional Object */}
                                                                                {nodeInfo.functionalObject && (
                                                                                    <div className="w-full text-xs text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md mb-2 border border-gray-200 dark:border-gray-600">
                                                                                       {nodeInfo.functionalRole && (<div className="font-medium mb-1 text-gray-800 dark:text-gray-200">
                                                                                            {nodeInfo.functionalRole}
                                                                                        </div>)}
                                                                                        {nodeInfo.functionalObject}
                                                                                    </div>
                                                                                )}
                                                                                {((nodeInfo.topics?.length > 0) || (nodeInfo.concepts?.length > 0)) && (
                                                                                <div className='w-full flex flex-col bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md mb-2 border border-gray-200 dark:border-gray-600'>
                                                                                {/* Topics badges */}
                                                                                {renderBadges(nodeInfo.topics, 'topic')}

                                                                                {/* Concepts badges */}
                                                                                {renderBadges(nodeInfo.concepts, 'concept')}
                                                                                </div>)}

                                                                                </div>

                                                                                {nodeInfo.content && (
                                                                                    <div className="text-sm whitespace-pre-wrap mb-3">
                                                                                        {nodeInfo.content}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                        )}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            );
                                        })}
                                    </Accordion>
                                </div>
                            </div>
                        )}
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default ChatGraphModal;
