import { useEffect, useState } from "react";

const useFetchFiltered = (url, user) => {
    const [dataFiltered, setData] = useState()
    const [isLoadingFiltered, setIsLoading] = useState(true)
    const [errorLoadingFiltered, setErrorLoading] = useState()

    useEffect(() => {
        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error("could not fetch data")
                }
                return res.json()
            })
            .then(data => {
                setData(data.filter((post) => post.user === user))
                setIsLoading(false)
            })
            .catch(err => {
                setErrorLoading(err.message)
                setIsLoading(false)
            })
    }, [errorLoadingFiltered])
    
    return { dataFiltered, isLoadingFiltered, errorLoadingFiltered }
}

export default useFetchFiltered;