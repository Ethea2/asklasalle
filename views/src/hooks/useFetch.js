import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [errorLoading, setErrorLoading] = useState()

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch data")
                }
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
            .catch(err => {
                setErrorLoading(err.message)
                setIsLoading(false)
            })
    }, [errorLoading])
    return { data, isLoading, errorLoading }
}

export default useFetch;