import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TablePaginationProps } from '@/types/DeviceTable';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TablePagination: React.FC<TablePaginationProps> = ({
    page,
    totalPages,
    rowsPerPage,
    rowsPerPageOptions,
    totalRows,
    onPageChange,
    onRowsPerPageChange,
}) => {
    return (
        <div className="flex items-center w-full">
            <div className="flex flex-wrap flex-col sm:flex-row justify-between items-center gap-2.5 py-2.5 sm:py-0 grow w-full">
                <div className="flex flex-wrap items-center space-x-2.5 pb-2.5 sm:pb-0 order-2 sm:order-1">
                    <span className="text-sm text-muted-foreground">Rows per page</span>
                    <Select value={String(rowsPerPage)} onValueChange={onRowsPerPageChange}>
                        <SelectTrigger className="w-fit h-7 px-2.5 text-xs">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {rowsPerPageOptions.map((opt) => (
                                <SelectItem key={opt} value={String(opt)}>
                                    {opt}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-2.5 pt-2.5 sm:pt-0 order-1 sm:order-2">
                    <span className="text-sm text-muted-foreground text-nowrap order-2 sm:order-1">
                        {totalRows === 0
                            ? '0 of 0'
                            : `${(page - 1) * rowsPerPage + 1} - ${Math.min(page * rowsPerPage, totalRows)} of ${totalRows}`}
                    </span>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onPageChange(page - 1)}
                                    disabled={page === 1}
                                >
                                    <span className="sr-only">Go to previous page</span>
                                    <ChevronLeft />
                                </Button>
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .slice(0, 4)
                                .map((p) => (
                                    <PaginationItem key={p}>
                                        <Button
                                            variant={p === page ? 'secondary' : 'ghost'}
                                            size="icon"
                                            onClick={() => onPageChange(p)}
                                        >
                                            {p}
                                        </Button>
                                    </PaginationItem>
                                ))}
                            {totalPages > 4 && <PaginationEllipsis />}
                            <PaginationItem>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onPageChange(page + 1)}
                                    disabled={page === totalPages || totalPages === 0}
                                >
                                    <span className="sr-only">Go to next page</span>
                                    <ChevronRight />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;
