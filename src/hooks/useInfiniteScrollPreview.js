import { useInfiniteQuery } from "@tanstack/react-query";

const ITEMS_PER_PAGE = 12;

export const useInfiniteScrollPreview = (arrayToRender, isUsingAI) => {
  const fetchPage = ({ pageParam = 0 }) => {
    const start = pageParam * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = arrayToRender.slice(start, end);

    return Promise.resolve({
      items,
      nextCursor: end < arrayToRender.length ? pageParam + 1 : undefined,
      hasMore: end < arrayToRender.length,
    });
  };

  const query = useInfiniteQuery({
    queryKey: ["preview", isUsingAI, arrayToRender.length],
    queryFn: fetchPage,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    enabled: Array.isArray(arrayToRender) && arrayToRender.length > 0,
    staleTime: Infinity,
  });
  return {
    ...query,
    allItems: query.data?.pages?.flatMap((page) => page.items) || [],
    totalItems: arrayToRender?.length || 0,
  };
};
