import { useMemo } from "react";

export const DOTS = "...";
export const usePagination = ({
  siblingCount = 1,
  currentPage,
  totalPageCount,
}) => {
  const paginationRange = useMemo(() => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shoudShowLeftDots = leftSiblingIndex > 2;
    const shoudShowRightDots = leftSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;

    const lastFageIndex = totalPageCount;

    if (!shoudShowLeftDots && shoudShowRightDots) {
      let leftItemCount = 3 + 2 + siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }
    if (shoudShowLeftDots && !shoudShowRightDots) {
      let rightItemCount = 3 + 2 + siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    //     if(!)

    if (shoudShowLeftDots && shoudShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, middleRange, DOTS, lastFageIndex];
    }
  }, [siblingCount, currentPage, totalPageCount]);
  return paginationRange;
};

function range(start, end) {
  const length = end - start + 1;
  return Array.from({ length }, (value, index) => index + start);
}
