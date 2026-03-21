import { Button } from "@/components/ui/button";

interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: Props) {

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-4">

            <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Prev
            </Button>

            <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                px-3 py-1 rounded-md text-sm
                                ${page === currentPage
                                    ? "bg-primary text-white"
                                    : "bg-muted hover:bg-muted/70"}
                            `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>

        </div>
    );
}