import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchCategories, fetchProducts } from "../api/productsApi"

const PAGE_SIZE = 12

export function useProducts(query, category) {
  return useInfiniteQuery({
    queryKey: ["products", query, category],
    queryFn: ({ pageParam = 0, signal }) =>
      fetchProducts({ query, category, skip: pageParam, limit: PAGE_SIZE, signal }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.products.length
      return nextSkip < lastPage.total ? nextSkip : undefined
    },
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
  })
}
