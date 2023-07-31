import { useEffect, useState } from "react";

const useFetchSimpleUser = (url) => {
    const [users, setUsers] = useState()
    const apiUrl = 
        process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_URL_PRODUCTION
        : process.env.REACT_APP_URL_DEV
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(apiUrl+url)
            const json = await response.json()
            
            if (response.ok) {
                setUsers(json)
            }
        }
        fetchData()
    }, [url])

    return users
}

export default useFetchSimpleUser;