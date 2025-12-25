import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getApiData } from "../services/api-service";

export const useCraftApi = (url) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["apiData", url],
    queryFn: () => getApiData(url),
    enabled: false,
  });

  const fetchApi = async () => {
    try {
      await queryClient.cancelQueries({ queryKey: ["apiData"] });
      return await query.refetch();
    } catch (error) {
      throw error;
    }
  };

  return {
    ...query,
    fetchApi,
  };
};
