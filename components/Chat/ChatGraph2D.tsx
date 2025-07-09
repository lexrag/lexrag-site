'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { genRandomTree } from '@/utils/genRandomTree';
import { useTheme } from 'next-themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

interface ChatGraph2DProps {
    height?: number;
    width?: number;
}

const ChatGraph2D = ({ height, width }: ChatGraph2DProps) => {
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

    const data = useMemo(() => genRandomTree(300, true), []);

    return (
        <ForceGraph2D
            width={width || dimensions.width}
            height={height || dimensions.height}
            graphData={data}
            backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
            nodeAutoColorBy="group"
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={() => 0.005}
            nodeLabel={(node) => `${node.id}`}
        />
    );
};

export default ChatGraph2D;
