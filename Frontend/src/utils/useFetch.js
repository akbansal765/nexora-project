import { useEffect, useState } from "react";

export function useFetch(url){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData(){
            try{
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Unable to fetch data! Try again later.');
                }
                const data = await res.json();
                setData(data);
            }catch(err){
                setError(err);
            }
        }
        fetchData();
    }, [url])

    return {data, error};
}