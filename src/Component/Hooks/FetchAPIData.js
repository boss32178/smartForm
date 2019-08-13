import { useState, useEffect } from 'react';

export const useFetchAPIData = (url, dependencies) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(url, { headers: { "Content-Type": "application/json" } })
            .then(res => res.jason)
            .then(data => {
                setIsLoading(false);
                setFetchedData(data);
            })
            .catch(err => {
                setError(err);
                setIsLoading(false);
            })
    },  [url, dependencies])

    return[isLoading, fetchedData, error];
};