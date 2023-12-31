import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './useAuthContext'
import useFetchSimpleUser from './useFetchSimpleUser';

export const useLogin = () => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const [iserror, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password, stayLogged) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(apiUrl + '/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, stayLogged })
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {    
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            localStorage.setItem('staylogged', stayLogged)
            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)

            //navigate to userpage
            navigate('/homepage')
        }
    }

    return { login, isLoading, iserror }
}