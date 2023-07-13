import { useEffect, useState } from "react";

const useFetchUser = (url, username) => {
    const [user, setUser] = useState()
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
                setUser(data.find((user) => {
                    return user.user === username
                }))
                setIsLoading(false)
            })
            .catch(err => {
                setErrorLoading(err.message)
                setIsLoading(false)
            })
    }, [errorLoading])
    return { user, isLoading, errorLoading }

}

export default useFetchUser;