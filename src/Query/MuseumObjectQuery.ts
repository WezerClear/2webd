import { useQuery } from "@tanstack/react-query";

export function useAllObjectsQuery() {
  return useQuery({
    queryKey: ['allObjects'], 
    queryFn: async () => {
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects`);

      if (!response.ok) {
        throw new Error('Failed to fetch objects'); 
      }

      const data = await response.json();
      return data;
    },
  });
}
