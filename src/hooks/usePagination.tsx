import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

interface UsePaginationReturn<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
}

export const usePagination = <T,>({ 
  items, 
  itemsPerPage 
}: UsePaginationProps<T>): UsePaginationReturn<T> => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const totalItems = items.length;

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      
      // Scroll to materials grid in a more intelligent way
      setTimeout(() => {
        // Try to find the materials grid container
        const grid = document.querySelector('.grid');
        if (grid) {
          const gridTop = grid.getBoundingClientRect().top + window.pageYOffset;
          // Scroll to slightly above the grid (with some padding)
          window.scrollTo({ 
            top: Math.max(0, gridTop - 100), 
            behavior: 'smooth' 
          });
        } else {
          // Fallback: scroll to a reasonable position
          window.scrollTo({ top: 200, behavior: 'smooth' });
        }
      }, 50); // Small delay to ensure content has updated
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Reset to page 1 if items change and current page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(1);
  }

  return {
    currentItems,
    currentPage,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    isFirstPage,
    isLastPage
  };
};
