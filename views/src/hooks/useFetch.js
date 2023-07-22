import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [errorLoading, setErrorLoading] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
            const json = await response.json()
            
            if (response.ok) {
                setData(json)
                console.log(json)
                setIsLoading(false)
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