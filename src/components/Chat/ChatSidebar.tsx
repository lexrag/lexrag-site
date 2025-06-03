const ChatSidebar = () => {
    return (
        <div
            role="dialog"
            className="inset-5 z-1 flex h-auto w-3/4 flex-col items-strech gap-4 rounded-lg border-s bg-background p-0 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=open]:duration-400 data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right rtl:data-[state=closed]:slide-out-to-left rtl:data-[state=open]:slide-in-from-left sm:w-[560px] sm:max-w-none"
        >
            <div className="border-border flex flex-col space-y-1 border-b py-3.5 px-5 text-center sm:text-start">
                <h2 className="text-base font-semibold text-foreground">Wishlist</h2>
            </div>

            <div className="px-5 py-0">
                <div className="relative h-[calc(100dvh-12rem)] overflow-hidden pe-3 -me-3 text-sm">
                    <div className="h-full w-full overflow-y-scroll rounded-[inherit]">
                        {[11, 12, 13, 15].map((id, index) => (
                            <div
                                key={index}
                                className="mb-7.5 flex flex-col items-stretch rounded-xl border border-border bg-card text-card-foreground shadow-xs black/5"
                            >
                                <div className="flex grow items-center justify-between gap-3.5 p-2 pe-5">
                                    <div className="flex h-[70px] w-[90px] flex-col items-center justify-center rounded-xl border border-border bg-accent/50 shadow-xs black/5">
                                        <img
                                            className="size-15"
                                            alt="img"
                                            src={`/media/store/client/600x600/${id}.png`}
                                        />
                                    </div>
                                    <div className="flex w-full flex-col gap-2">
                                        <div className="-mt-1 flex flex-wrap items-center justify-between gap-2.5">
                                            <a
                                                className="text-dark hover:text-primary-active text-sm font-medium leading-5.5"
                                                href="#"
                                            >
                                                Product Name {id}
                                            </a>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div className="flex flex-wrap items-center gap-3">
                                                {/*<span className="inline-flex min-w-5 items-center justify-center gap-1 rounded-full border border-transparent bg-yellow-500 px-[0.325rem] text-[0.6875rem] font-medium leading-[0.75rem] text-white">*/}
                                                {/*  <Star className="size-3 text-white" /> 4.{id % 5}*/}
                                                {/*</span>*/}
                                                <span className="text-xs font-normal text-secondary-foreground">
                                                    Brand:
                                                    <span className="text-foreground text-xs font-medium">
                                                        Brand {index + 1}
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-dark text-sm font-medium">
                                                  ${100 + id}.00
                                                </span>
                                                {/*<button className="inline-flex h-7 items-center justify-center gap-1.25 rounded-md border border-input bg-background px-2.5 text-xs font-medium text-accent-foreground shadow-xs shadow-black/5 transition-[color,box-shadow] hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">*/}
                                                {/*    <ShoppingCart className="size-3.5" /> Add*/}
                                                {/*</button>*/}
                                                {/*<button className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-background p-0 text-xs font-medium text-accent-foreground shadow-xs shadow-black/5 transition-[color,box-shadow] hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">*/}
                                                {/*    <Trash className="size-3.5" />*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-border flex flex-col-reverse border-t py-3.5 px-5 sm:flex-row sm:justify-end sm:space-x-2">
                <button className="inline-flex h-8.5 w-full items-center justify-center gap-1.5 rounded-md border border-input bg-background px-3 text-[0.8125rem] font-medium text-accent-foreground shadow-xs shadow-black/5 transition-[color,box-shadow] hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Remove all
                </button>
            </div>

            <button
                type="button"
                className="absolute end-5 top-4 rounded-sm opacity-60 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                {/*<X className="h-4 w-4" />*/}
                <span className="sr-only">Close</span>
            </button>
        </div>
    );
}

export default ChatSidebar;
