import { useEffect, useState } from "react"

export default function useLoadVideos({searchQuery, pageNumber}) {
    useEffect(() => {
        const cacheKey = `videos_${searchQuery}`;
        const cachedResults = localStorage.getItem(cacheKey);

        if (cachedResults) {
            setBackEndData(JSON.parse(cachedResults));
            setLoading(false);
        }

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
    }, [searchQuery]);

    return null
}
