import React from 'react';
import { motion } from 'framer-motion';

const LoadingDot = {
    display: 'block',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'black',
    borderRadius: '50%',
};

const LoadingContainer = {
    width: '2.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'space-around',
};

const ContainerVariants = {
    initial: {
        transition: {
            staggerChildren: 0.2,
        },
    },
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const DotVariants = {
    initial: {
        y: '0%',
    },
    animate: {
        y: '100%',
    },
};

const DotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'reverse',
    ease: 'easeInOut',
} as any;

export default function ThreeDotsWave() {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <motion.div style={LoadingContainer} variants={ContainerVariants} initial="initial" animate="animate">
                <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
                <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
                <motion.span style={LoadingDot} variants={DotVariants} transition={DotTransition} />
            </motion.div>
        </div>
    );
}
