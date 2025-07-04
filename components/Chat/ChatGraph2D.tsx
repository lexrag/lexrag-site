'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export function genRandomTree(N = 300, reverse = false) {
    return {
        nodes: [...Array(N).keys()].map((i) => ({ id: i })),
        links: [...Array(N).keys()]
            .filter((id) => id)
            .map((id) => ({
                [reverse ? 'target' : 'source']: id,
                [reverse ? 'source' : 'target']: Math.round(Math.random() * (id - 1)),
                color: '#007AFF',
            })),
    };
}

const ChatGraph2D = () => {
    const { resolvedTheme } = useTheme();

    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const updateDimensions = () => {
            setDimensions({
                width: window.innerWidth * 0.6,
                height: window.innerHeight * 0.6,
            });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const data = genRandomTree();

    return (
        <div>
            {dimensions.width > 0 && dimensions.height > 0 && (
                <ForceGraph2D
                    width={dimensions.width}
                    height={dimensions.height}
                    graphData={data}
                    backgroundColor={resolvedTheme === 'dark' ? '#09090b' : '#fff'}
                    nodeAutoColorBy="group"
                    linkDirectionalParticles={2}
                    linkDirectionalParticleSpeed={() => 0.005}
                    nodeLabel={(node) => `${node.id}`}
                />
            )}
        </div>
    );
};

export default ChatGraph2D;
