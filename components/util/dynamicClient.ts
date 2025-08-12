// All comments in code strictly in English
import dynamic from 'next/dynamic';

/**
 * Wrap a component to ensure it only renders on the client,
 * avoiding SSR/hydration mismatches for DOM-mutating widgets.
 */
export const dynamicClient = <T extends object>(loader: () => Promise<React.ComponentType<T>>) =>
    dynamic(loader, { ssr: false });
