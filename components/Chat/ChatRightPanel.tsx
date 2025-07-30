'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { ChevronDown, ChevronUp, Expand, Fullscreen, Globe, Layers } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer } from '@/types/Graph';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ChatRightPanelProps {
    currentMessage: any;
    graphLayers: GraphLayer[];
    setGraphLayers: Dispatch<SetStateAction<GraphLayer[]>>;
    cardData: CardData;
    graphView: string;
    setGraphView: (view: string) => void;
    handleCardData: Dispatch<SetStateAction<CardData>>;
    setIsOpenGraphModal: (open: boolean) => void;
}

const ChatRightPanel = ({
    currentMessage,
    graphLayers,
    setGraphLayers,
    cardData,
    graphView,
    setGraphView,
    handleCardData,
    setIsOpenGraphModal,
}: ChatRightPanelProps) => {
    const [rightPanelWidth, setRightPanelWidth] = useState<number>(0);
    const [isResizing, setIsResizing] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [isGraphCollapsed, setIsGraphCollapsed] = useState<boolean>(false);
    const [openAccordionItems, setOpenAccordionItems] = useState<string[]>([]);
    const [scrollToCardId, setScrollToCardId] = useState<string>('');
    const [isOrbitEnabled, setIsOrbitEnabled] = useState<boolean>(false);

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());

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
        setSelectedItem(isCurrentlySelected ? null : groupKey);
        setSelectedGroup(isCurrentlySelected ? null : groupKey);

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
        };
    };

    const toggleGraphVisibility = () => {
        setIsGraphCollapsed(!isGraphCollapsed);
    };

    useEffect(() => {
        setRightPanelWidth(window.innerWidth * 0.25);
    }, []);



    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing) return;

            const width = window.innerWidth;
            const newWidth = window.innerWidth - e.clientX;
            setRightPanelWidth(Math.max(width * 0.15, Math.min(newWidth, width * 0.5)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'col-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isResizing]);

    const renderBadges = (items: string[], type: 'topic' | 'concept') => {
        if (!items || items.length === 0) return null;

        const getBadgeColor = (type: string) => {
            switch (type) {
                case 'topic':
                    return 'bg-purple-100 text-purple-800 border-purple-200';
                case 'concept':
                    return 'bg-indigo-100 text-indigo-800 border-indigo-200';
                default:
                    return 'bg-gray-100 text-gray-800 border-gray-200';
            }
        };

        return (
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
        );
    };

    return (
        <div className="hidden md:flex h-full" style={{ width: `${rightPanelWidth}px` }}>
            <div onMouseDown={() => setIsResizing(true)} className="w-3 cursor-col-resize relative z-30">
                <div 
                    className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-12 w-2 rounded-md bg-muted-foreground/40 hover:bg-primary transition-colors cursor-pointer"
                    title="Drag to Resize Panel"
                />
            </div>
            <aside className="w-full flex flex-col overflow-hidden">
                <Card className="flex-1 rounded-none border-0 shadow-none overflow-hidden">
                    <CardContent className="p-0 relative flex flex-col h-full">
                        <div
                            className={`w-full relative overflow-hidden transition-all duration-300 ${
                                isGraphCollapsed ? 'h-0 opacity-0' : 'h-1/2 opacity-100'
                            }`}
                        >
                            {graphView === '2d' && (
                                <ChatGraph2D
                                    height={window.innerHeight * 0.5}
                                    width={rightPanelWidth}
                                    layers={graphLayers}
                                    data={currentMessage}
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
                                />
                            )}
                            {graphView === '3d' && (
                                <ChatGraph3D
                                    height={window.innerHeight * 0.5}
                                    width={rightPanelWidth}
                                    data={currentMessage}
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
                                />
                            )}

                            <div className="absolute top-3 left-3 right-3 z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Tabs value={graphView} onValueChange={setGraphView}>
                                            <TabsList className="w-fit grid grid-cols-2">
                                                <TabsTrigger value="2d" className="text-[12px] py-1 px-2" title="Switch to 2D Graph View">
                                                    2D
                                                </TabsTrigger>
                                                <TabsTrigger value="3d" className="text-[12px] py-1 px-2" title="Switch to 3D Graph View">
                                                    3D
                                                </TabsTrigger>
                                            </TabsList>
                                        </Tabs>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div 
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
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
                                        <div className="flex items-center gap-1">
                                            {graphView === '3d' && (
                                                <div
                                                    onClick={() => setIsOrbitEnabled(!isOrbitEnabled)}
                                                    className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer ${
                                                        isOrbitEnabled
                                                            ? 'bg-primary text-primary-foreground border-primary'
                                                            : 'bg-background border-input hover:bg-accent hover:text-accent-foreground'
                                                    }`}
                                                    title={isOrbitEnabled ? 'Disable Camera Orbit' : 'Enable Camera Orbit'}
                                                >
                                                    <Globe className={`h-4 w-4 ${isOrbitEnabled ? 'animate-spin' : ''}`} />
                                                </div>
                                            )}
                                            <div
                                                className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                                onClick={() => setIsOpenGraphModal(true)}
                                                title="Expand Graph to Full Screen"
                                            >
                                                <Expand className="h-4 w-4" />
                                            </div>
                                            <div
                                                className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                                onClick={() => zoomToFitGraph()}
                                                title="Zoom to Fit All Nodes"
                                            >
                                                <Fullscreen className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {(!!currentMessage && Object.entries(groupedNodes).length > 0)  && (
                            <div
                                className={`px-3 py-2 overflow-hidden transition-all duration-300 ${
                                    isGraphCollapsed ? 'flex-1' : 'flex-1'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                                    <h3 className="font-semibold text-sm text-muted-foreground">Legal Documents</h3>
                                    <div
                                        className="flex items-center justify-center w-7 h-7 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                        onClick={toggleGraphVisibility}
                                        title={isGraphCollapsed ? 'Show Graph Panel' : 'Hide Graph Panel'}
                                    >
                                        {isGraphCollapsed ? (
                                            <ChevronDown className="h-4 w-4" />
                                        ) : (
                                            <ChevronUp className="h-4 w-4" />
                                        )}
                                    </div>
                                </div>

                                <Accordion
                                    type="multiple"
                                    className="w-full h-full overflow-y-auto pb-6"
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
                                                className={`transition-all duration-300 ${
                                                    selectedItem === groupKey
                                                        ? 'border-l-2 border-l-primary bg-primary/10'
                                                        : selectedGroup === groupKey
                                                          ? 'border-l-2 border-l-primary/70 bg-primary/5'
                                                          : 'hover:bg-muted/30'
                                                }`}
                                            >
                                                <AccordionTrigger
                                                    className="hover:no-underline"
                                                >
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
                                                <AccordionContent className="space-y-3">
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
                                                                    className={`border-l-2 pl-4 cursor-pointer transition-all duration-200 ${
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

                                                                            {/* Topics badges */}
                                                                            {renderBadges(nodeInfo.topics, 'topic')}

                                                                            {/* Concepts badges */}
                                                                            {renderBadges(nodeInfo.concepts, 'concept')}

                                                                            {/* Functional Object */}
                                                                            {nodeInfo.functionalObject && (
                                                                                <div className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-md mb-2 border border-amber-200">
                                                                                    {nodeInfo.functionalObject}
                                                                                </div>
                                                                            )}

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
                        )}
                    </CardContent>
                </Card>
            </aside>
        </div>
    );
};

export default ChatRightPanel;
