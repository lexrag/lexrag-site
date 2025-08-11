'use client';

export function ScreenLoader() {
    return (
        <div className="flex flex-col items-center gap-2 justify-center fixed inset-0 z-50 transition-opacity duration-700 ease-in-out">
            <img className="h-[30px] max-w-none" src="/media/app/mini-logo.svg" alt="logo" />
            <div className="text-muted-foreground font-medium text-sm">Loading...</div>
        </div>
    );
}
