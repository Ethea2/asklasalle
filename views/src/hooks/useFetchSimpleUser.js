import { useEffect, useState } from "react";

const useFetchSimpleUser = (url) => {
    const [users, setUsers] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url)
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