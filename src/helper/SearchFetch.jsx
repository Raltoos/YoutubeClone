import { useEffect } from "react";
import axios from "axios";

const useSearchFetch = (searchQuery, setLoading, setError, setBackEndData) => {
  useEffect(() => {
    const cacheKey = `videos_${searchQuery}`;
    const cachedResults = localStorage.getItem(cacheKey);

    if (cachedResults) {
      setBackEndData(JSON.parse(cachedResults));
      setLoading(false);
    } else {
      axios
        .get(`/api/search?q=${encodeURIComponent(searchQuery)}&no=12`)
        .then((response) => {
          setBackEndData(response.data);
          localStorage.setItem(cacheKey, JSON.stringify(response.data));
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchQuery, setBackEndData, setLoading, setError]);
};

export default useSearchFetch;
