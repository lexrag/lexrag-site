'use client';

import type {
    GlobalOptions as ConfettiGlobalOptions,
    CreateTypes as ConfettiInstance,
    Options as ConfettiOptions,
} from 'canvas-confetti';
import confetti from 'canvas-confetti';
import type { ReactNode } from 'react';
import React, {
    createContext,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';

import { Button } from '@/components/ui/button';

type Api = {
    fire: (options?: ConfettiOptions) => void;
};

type Props = React.ComponentPropsWithRef<'canvas'> & {
    options?: ConfettiOptions;
    globalOptions?: ConfettiGlobalOptions;
    manualstart?: boolean;
    children?: ReactNode;
};

export type ConfettiRef = Api | null;

const ConfettiContext = createContext<Api>({} as Api);

const ConfettiComponent = forwardRef<ConfettiRef, Props>((props, ref) => {
    const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, children, ...rest } =
        props;
    const instanceRef = useRef<ConfettiInstance | null>(null);
    const elementRef = useRef<HTMLCanvasElement | null>(null);

    const sizeCanvasToParent = useCallback((node: HTMLCanvasElement) => {
        try {
            const dpr = typeof window !== 'undefined' ? Math.max(1, Math.floor(window.devicePixelRatio || 1)) : 1;
            const rect = node.getBoundingClientRect();
            const cssWidth = Math.max(0, Math.floor(rect.width));
            const cssHeight = Math.max(0, Math.floor(rect.height));
            if (cssWidth === 0 || cssHeight === 0) return;
            node.style.width = '100%';
            node.style.height = '100%';
            const targetWidth = cssWidth * dpr;
            const targetHeight = cssHeight * dpr;
            if (node.width !== targetWidth) node.width = targetWidth;
            if (node.height !== targetHeight) node.height = targetHeight;
        } catch (error) {
            console.error('Confetti size error:', error);
        }
    }, []);

    const canvasRef = useCallback(
        (node: HTMLCanvasElement) => {
            elementRef.current = node ?? null;
            if (node !== null) {
                sizeCanvasToParent(node);
                if (!instanceRef.current) {
                    instanceRef.current = confetti.create(node, {
                        ...globalOptions,
                        resize: false,
                    });
                }
            } else {
                if (instanceRef.current) {
                    instanceRef.current.reset();
                    instanceRef.current = null;
                }
            }
        },
        [globalOptions, sizeCanvasToParent],
    );

    useEffect(() => {
        const node = elementRef.current;
        if (!node) return;
        sizeCanvasToParent(node);
        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => sizeCanvasToParent(node));
            ro.observe(node);
            if (node.parentElement) ro.observe(node.parentElement);
        } else {
            const onResize = () => sizeCanvasToParent(node);
            window.addEventListener('resize', onResize);
            return () => window.removeEventListener('resize', onResize);
        }
        return () => {
            ro?.disconnect();
        };
    }, [sizeCanvasToParent]);

    const fire = useCallback(
        async (opts = {}) => {
            try {
                await instanceRef.current?.({ ...options, ...opts });
            } catch (error) {
                console.error('Confetti error:', error);
            }
        },
        [options],
    );

    const api = useMemo(
        () => ({
            fire,
        }),
        [fire],
    );

    useImperativeHandle(ref, () => api, [api]);

    useEffect(() => {
        if (!manualstart) {
            (async () => {
                try {
                    await fire();
                } catch (error) {
                    console.error('Confetti effect error:', error);
                }
            })();
        }
    }, [manualstart, fire]);

    return (
        <ConfettiContext.Provider value={api}>
            <canvas ref={canvasRef} {...rest} />
            {children}
        </ConfettiContext.Provider>
    );
});

ConfettiComponent.displayName = 'Confetti';

export const Confetti = ConfettiComponent;

interface ConfettiButtonProps extends React.ComponentProps<typeof Button> {
    options?: ConfettiOptions & ConfettiGlobalOptions & { canvas?: HTMLCanvasElement };
}

const ConfettiButtonComponent = ({ options, children, ...props }: ConfettiButtonProps) => {
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            await confetti({
                ...options,
                origin: {
                    x: x / window.innerWidth,
                    y: y / window.innerHeight,
                },
            });
        } catch (error) {
            console.error('Confetti button error:', error);
        }
    };

    return (
        <Button onClick={handleClick} {...props}>
            {children}
        </Button>
    );
};

ConfettiButtonComponent.displayName = 'ConfettiButton';

export const ConfettiButton = ConfettiButtonComponent;


