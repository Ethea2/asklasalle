import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [errorLoading, setErrorLoading] = useState()
    const apiUrl = 
        process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_URL_PRODUCTION
        : process.env.REACT_APP_URL_DEV

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(apiUrl+url)
            const json = await response.json()
            
            if (response.ok) {
                setIsLoading(false)
                setData(json)
            } else {
                setErrorLoading("Failed to fetch")
            }
        }
        fetchData()
    }, [url])

    return { data, isLoading, errorLoading }
}

export default useFetch;


        // fetch(url)
        //     .then(res => {
        //         if (!res.ok) {
        //             throw Error("could not fetch data")
        //         }
        //         return res.json()
        //     })
        //     .then(data => {
        //         setData(data)
        //         setIsLoading(false)
        //     })
        //     .catch(err => {
        //         setErrorLoading(err.message)
        //         setIsLoading(false)
        //     })