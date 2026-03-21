import { useState, useMemo } from "react";

export function usePagination<T>(data: T[], perPage: number = 10) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / perPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * perPage;
        return data.slice(start, start + perPage);
    }, [data, currentPage, perPage]);

    const next = () => {
        setCurrentPage((p) => Math.min(p + 1, totalPages));
    };

    const prev = () => {
        setCurrentPage((p) => Math.max(p - 1, 1));
    };

    const goTo = (page: number) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        totalPages,
        paginatedData,
        next,
        prev,
        goTo,
    };
}