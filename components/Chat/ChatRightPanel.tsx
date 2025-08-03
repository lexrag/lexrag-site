'use client';

import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zoomToFitGraph } from '@/events/zoom-to-fit';
import { zoomToNodeGraph } from '@/events/zoom-to-node';
import { ChevronDown, ChevronRight, ChevronUp, Expand, Fullscreen, Globe, Layers, Link } from 'lucide-react';
import { CardData } from '@/types/Chat';
import { GraphLayer, GraphLinkFilter, GraphNodeFilter } from '@/types/Graph';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatGraph2D from '@/components/Chat/ChatGraph2D';
import ChatGraph3D from '@/components/Chat/ChatGraph3D';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';

interface ChatRightPanelProps {
    currentMessage: any;
    graphLayers: GraphLayer[];
    setGraphLayers: Dispatch<SetStateAction<GraphLayer[]>>;
    graphLinkFilters: GraphLinkFilter[];
    setGraphLinkFilters: Dispatch<SetStateAction<GraphLinkFilter[]>>;
    graphNodeFilters: GraphNodeFilter[];
    setGraphNodeFilters: Dispatch<SetStateAction<GraphNodeFilter[]>>;
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
    graphLinkFilters,
    setGraphLinkFilters,
    graphNodeFilters,
    setGraphNodeFilters,
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
    const [expandedContents, setExpandedContents] = useState<Set<string>>(new Set());

    const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
    const [nodeHierarchy, setNodeHierarchy] = useState<Record<string, Set<string>>>({});
    const [expandedData, setExpandedData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
    const [loadingNodes, setLoadingNodes] = useState<Set<string>>(new Set());

    const nodeRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const accordionContainerRef = useRef<HTMLDivElement | null>(null);

    const getNodeColor = (node: any): string => {
        if (loadingNodes.has(node.id)) {
            return '#f59e0b';
        }

        if (node.color && (!node.labels || node.labels.length === 0)) {
            return node.color;
        }

        if (node.labels) {
            if (node.labels.includes('CaseLaw') || node.labels.includes('Case')) {
                return '#D9C8AE';
            }

            if (node.labels.includes('Paragraph')) {
                return '#8DCC93';
            }

            if (node.labels.includes('Court') || node.labels.includes('Tribunal')) {
                return '#DA7194';
            }

            if (node.labels.includes('Judge') || node.labels.includes('Justice')) {
                return '#C990C0';
            }

            if (
                node.labels.includes('Party') ||
                node.labels.includes('Plaintiff') ||
                node.labels.includes('Defendant') ||
                node.labels.includes('Appellant') ||
                node.labels.includes('Respondent')
            ) {
                return '#ECB5C9';
            }

            if (
                node.labels.includes('Act') ||
                node.labels.includes('Law') ||
                node.labels.includes('Statute') ||
                node.labels.includes('Legislation')
            ) {
                return '#F79767';
            }

            if (
                node.labels.includes('Regulation') ||
                node.labels.includes('Order') ||
                node.labels.includes('Decree') ||
                node.labels.includes('Resolution') ||
                node.labels.includes('SubsidiaryLegislation')
            ) {
                return '#ECB5C9';
            }

            if (node.labels.includes('Article') || node.labels.includes('Section')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Citation') || node.labels.includes('Reference')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Document') || node.labels.includes('Filing')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Resource')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Work')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Organization')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Person')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('Embeddable')) {
                return '#A5ABB6';
            }

            if (node.labels.includes('MasterExpression')) {
                return '#F16667';
            }

            if (node.labels.includes('SubTopic')) {
                return '#57C7E3';
            }

            if (node.labels.includes('Expression')) {
                return '#F16667';
            }

            if (node.labels.includes('Topic')) {
                return '#4C8EDA';
            }

            if (node.labels.includes('PartOfTheLegislation')) {
                return '#FFC454';
            }

            if (node.labels.includes('SLOpening')) {
                return '#A5ABB6';
            }
        }

        return '#A5ABB6'; // Default color
    };

    const findGroupByNodeId = useCallback(
        (nodeId: string) => {
            if (!cardData.nodes) return null;

            const node = cardData.nodes.find((n) => n.id === nodeId);
            if (!node) return null;

            return node.parentId || nodeId;
        },
        [cardData.nodes],
    );

    const accordionTriggerRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const toggleContentExpansion = (nodeId: string) => {
        setExpandedContents((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(nodeId)) {
                newSet.delete(nodeId);
            } else {
                newSet.add(nodeId);
            }
            return newSet;
        });
    };

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

            const targetNode = cardData.nodes.find((node) => node.id === scrollToCardId);
            if (targetNode && targetNode.x !== undefined && targetNode.y !== undefined) {
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

    const parentNodesMap = useMemo(() => {
        if (!cardData.nodes || cardData.nodes.length === 0) {
            return {};
        }

        const parents: { [key: string]: any } = {};

        cardData.nodes.forEach((node) => {
            if (!node.parentId) {
                parents[node.id] = node;
            }
        });

        return parents;
    }, [cardData.nodes]);

    const getGroupInfo = (parentId: string, nodes: any[]) => {
        const parentNode = parentNodesMap[parentId];

        if (parentNode) {
            if (parentNode.labels?.includes('CaseLaw')) {
                return {
                    displayName: parentNode.content || 'Case',
                    type: 'case',
                    citation: parentNode.neutralCitation,
                    date: parentNode.date,
                };
            } else if (parentNode.labels?.includes('Act')) {
                return {
                    displayName: parentNode.content || 'Act',
                    type: 'act',
                    citation: null,
                    date: parentNode.date,
                };
            } else if (parentNode.labels?.includes('Resource')) {
                return {
                    displayName: parentNode.content || 'Regulations',
                    type: 'subsidiary',
                    citation: null,
                    date: parentNode.date,
                };
            }
        }

        const caseNode = nodes.find((node) => node.labels?.includes('CaseLaw'));
        if (caseNode) {
            return {
                displayName: caseNode.content || 'Case',
                type: 'case',
                citation: caseNode.neutralCitation,
                date: caseNode.date,
            };
        }

        const actNode = nodes.find((node) => node.labels?.includes('Act'));
        if (actNode) {
            return {
                displayName: actNode.content || 'Act',
                type: 'act',
                citation: null,
                date: actNode.date,
            };
        }

        if (parentId.includes('sso.agc.gov.sg/Act/')) {
            return {
                displayName: parentId.split('/').pop() || 'Act',
                type: 'act',
                citation: null,
                date: null,
            };
        } else if (parentId.includes('sso.agc.gov.sg/SL/')) {
            return {
                displayName: parentId.split('/').pop() || 'Regulations',
                type: 'subsidiary',
                citation: null,
                date: null,
            };
        } else if (parentId.includes('lawnet.com/openlaw/cases/')) {
            return {
                displayName: parentId.split('/').pop() || 'Case',
                type: 'case',
                citation: null,
                date: null,
            };
        }

        const firstNode = nodes[0];
        return {
            displayName: firstNode?.content || parentId.split('/').pop() || 'Document',
            type: 'custom',
            citation: null,
            date: firstNode?.date || null,
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

        cardData.nodes.forEach((node) => {
            const groupKey = node.parentId || node.id;

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }

            if (node.parentId) {
                groups[groupKey].push(node);
            }
        });

        const filteredGroups: { [key: string]: any[] } = {};
        Object.keys(groups).forEach((groupKey) => {
            const hasChildren = groups[groupKey].length > 0;
            const hasParent = parentNodesMap[groupKey] !== undefined;

            if (hasChildren || hasParent) {
                filteredGroups[groupKey] = groups[groupKey];
            }
        });

        return filteredGroups;
    }, [cardData.nodes, parentNodesMap]);

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

            const parentNode = parentNodesMap[groupKey];
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
        const nodeGroupKey = node.parentId || node.id;
        setSelectedItem(nodeId);
        setSelectedGroup(nodeGroupKey);

        const isParentNode = !node.parentId;

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
        } else if (node.heading) {
            title = node.heading;
        } else if (node.name) {
            title = node.name;
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
        };

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
                                    linkFilters={graphLinkFilters}
                                    setLinkFilters={setGraphLinkFilters}
                                    nodeFilters={graphNodeFilters}
                                    setNodeFilters={setGraphNodeFilters}
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
                                    linkFilters={graphLinkFilters}
                                    setLinkFilters={setGraphLinkFilters}
                                    nodeFilters={graphNodeFilters}
                                    setNodeFilters={setGraphNodeFilters}
                                />
                            )}

                            <div className="absolute top-3 left-3 right-3 z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Tabs value={graphView} onValueChange={setGraphView}>
                                            <TabsList className="w-fit grid grid-cols-2">
                                                <TabsTrigger
                                                    value="2d"
                                                    className="text-[12px] py-1 px-2"
                                                    title="Switch to 2D Graph View"
                                                >
                                                    2D
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="3d"
                                                    className="text-[12px] py-1 px-2"
                                                    title="Switch to 3D Graph View"
                                                >
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                                                    title="Toggle Graph Layers"
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
                                                    className="flex items-center justify-center w-8 h-8 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
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
                                        <div className="flex items-center gap-1">
                                            {graphView === '3d' && (
                                                <div
                                                    onClick={() => setIsOrbitEnabled(!isOrbitEnabled)}
                                                    className={`flex items-center justify-center w-8 h-8 rounded-md border transition-colors cursor-pointer ${
                                                        isOrbitEnabled
                                                            ? 'bg-primary text-primary-foreground border-primary'
                                                            : 'bg-background border-input hover:bg-accent hover:text-accent-foreground'
                                                    }`}
                                                    title={
                                                        isOrbitEnabled ? 'Disable Camera Orbit' : 'Enable Camera Orbit'
                                                    }
                                                >
                                                    <Globe
                                                        className={`h-4 w-4 ${isOrbitEnabled ? 'animate-spin' : ''}`}
                                                    />
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

                        {!!currentMessage && Object.entries(groupedNodes).length > 0 && (
                            <div
                                className={`px-3 py-2 overflow-hidden transition-all duration-300 ${
                                    isGraphCollapsed ? 'flex-1' : 'flex-1'
                                }`}
                            >
                                <div className="flex items-center justify-between mb-3 pb-2 pl-4 border-b border-border">
                                    <h3 className="font-semibold text-sm text-muted-foreground">Sources</h3>
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
                                    {Object.entries(groupedNodes).map(([parentId, nodes]) => {
                                        const groupInfo = getGroupInfo(parentId, nodes);

                                        const getTypeBadgeColor = (type: string) => {
                                            switch (type) {
                                                case 'case':
                                                    return 'text-gray-800 border-gray-300';
                                                case 'act':
                                                    return 'text-gray-800 border-gray-300';
                                                case 'subsidiary':
                                                    return 'text-gray-800 border-gray-300';
                                                default:
                                                    return 'text-gray-800 border-gray-300';
                                            }
                                        };

                                        const getTypeBadgeBackgroundColor = (type: string) => {
                                            switch (type) {
                                                case 'case':
                                                    return '#D9C8AE';
                                                case 'act':
                                                    return '#F79767';
                                                case 'subsidiary':
                                                    return '#A5ABB6';
                                                default:
                                                    return '#A5ABB6';
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
                                                    return 'Doc';
                                            }
                                        };

                                        return (
                                            <AccordionItem
                                                key={parentId}
                                                value={parentId}
                                                className={`transition-all duration-300 px-4 ${
                                                    selectedItem === parentId
                                                        ? 'border-l-2 border-l-primary bg-primary/10'
                                                        : selectedGroup === parentId
                                                          ? 'border-l-2 border-l-primary/70 bg-primary/5'
                                                          : 'hover:bg-muted/30'
                                                }`}
                                            >
                                                <AccordionTrigger className="hover:no-underline [&>svg]:size-6">
                                                    <div className="text-left flex items-center gap-2 w-full">
                                                        <div
                                                            className="flex-1 min-w-0 cursor-pointer"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleGroupClick(parentId);
                                                            }}
                                                            title={`Click to select and zoom to ${groupInfo.displayName}`}
                                                        >
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span
                                                                    className={`px-2 py-0.5 text-xs font-medium rounded-md border ${getTypeBadgeColor(groupInfo.type)}`}
                                                                    style={{
                                                                        backgroundColor: getTypeBadgeBackgroundColor(
                                                                            groupInfo.type,
                                                                        ),
                                                                    }}
                                                                >
                                                                    {getTypeLabel(groupInfo.type)}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    ({nodes.length} node{nodes.length !== 1 ? 's' : ''})
                                                                </span>
                                                            </div>
                                                            <div
                                                                className={`font-semibold transition-colors ${
                                                                    selectedItem === parentId
                                                                        ? 'text-primary'
                                                                        : selectedGroup === parentId
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
                                                <AccordionContent className="space-y-3 pt-2">
                                                    {nodes.length === 0 ? (
                                                        <div className="text-sm text-muted-foreground italic">
                                                            No detailed nodes available
                                                        </div>
                                                    ) : (
                                                        nodes.map((node: any) => {
                                                            const nodeInfo = getNodeDisplayInfo(node);
                                                            const isContentExpanded = expandedContents.has(node.id);
                                                            const hasContent =
                                                                nodeInfo.content && nodeInfo.content.trim().length > 0;

                                                            return (
                                                                <div
                                                                    key={node.id}
                                                                    ref={(el) => {
                                                                        nodeRefs.current[node.id] = el;
                                                                    }}
                                                                    className={`border-l-2 pl-2 pr-2 py-2 cursor-pointer transition-all duration-200 ${
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
                                                                        <div
                                                                            className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                                                                            style={{
                                                                                backgroundColor: getNodeColor(node),
                                                                            }}
                                                                        />
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

                                                                            <div className="flex gap-1">
                                                                                {/* Functional Object */}
                                                                                {nodeInfo.functionalObject && (
                                                                                    <div className="w-full text-xs text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md mb-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
                                                                                        {nodeInfo.functionalRole && (
                                                                                            <div className="font-medium mb-1 text-gray-800 dark:text-gray-200">
                                                                                                {
                                                                                                    nodeInfo.functionalRole
                                                                                                }
                                                                                            </div>
                                                                                        )}
                                                                                        {nodeInfo.functionalObject}
                                                                                    </div>
                                                                                )}
                                                                                {(nodeInfo.topics?.length > 0 ||
                                                                                    nodeInfo.concepts?.length > 0) && (
                                                                                    <div className="w-full flex flex-col px-2 py-1 rounded-md mb-2 border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50">
                                                                                        {/* Topics badges */}
                                                                                        {renderBadges(
                                                                                            nodeInfo.topics,
                                                                                            'topic',
                                                                                        )}

                                                                                        {/* Concepts badges */}
                                                                                        {renderBadges(
                                                                                            nodeInfo.concepts,
                                                                                            'concept',
                                                                                        )}
                                                                                    </div>
                                                                                )}
                                                                            </div>

                                                                            {/* Content with collapsible functionality */}
                                                                            {hasContent && (
                                                                                <div className="mb-2">
                                                                                    <button
                                                                                        onClick={(e) => {
                                                                                            e.stopPropagation();
                                                                                            toggleContentExpansion(
                                                                                                node.id,
                                                                                            );
                                                                                        }}
                                                                                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-2 p-1 -ml-1 rounded hover:bg-muted/50"
                                                                                        title={
                                                                                            isContentExpanded
                                                                                                ? 'Скрыть контент'
                                                                                                : 'Показать контент'
                                                                                        }
                                                                                    >
                                                                                        <ChevronRight
                                                                                            className={`h-3 w-3 transition-transform ${
                                                                                                isContentExpanded
                                                                                                    ? 'rotate-90'
                                                                                                    : ''
                                                                                            }`}
                                                                                        />
                                                                                        <span>Content</span>
                                                                                    </button>

                                                                                    <div
                                                                                        className={`overflow-hidden transition-all duration-200 ${
                                                                                            isContentExpanded
                                                                                                ? 'max-h-96 opacity-100'
                                                                                                : 'max-h-0 opacity-0'
                                                                                        }`}
                                                                                    >
                                                                                        <div className="text-sm whitespace-pre-wrap bg-muted/30 p-2 rounded-md border">
                                                                                            {nodeInfo.content}
                                                                                        </div>
                                                                                    </div>
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
