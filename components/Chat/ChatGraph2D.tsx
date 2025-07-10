'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
    data: any;
    handleSelectedRelevantContext: Dispatch<SetStateAction<any>>;
}

const ChatGraph2D = ({ height, width, data, handleSelectedRelevantContext }: ChatGraph2DProps) => {
    const { resolvedTheme } = useTheme();

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth * 0.9 - 24,
                height: window.innerHeight * 0.9 - 24,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <ForceGraph2D
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={data}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeAutoColorBy="group"
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={(node) => node.neutralCitation || `№ ${node.number}`}
            onNodeClick={(node) => handleSelectedRelevantContext(node)}
        />
    );
};

export default ChatGraph2D;
