import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [iserror, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    const signup = async (email, password, username) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password, username })
        })
        const json = await response.json()

        if (!response.ok) {
        setIsLoading(false)
        setError(json.error)
        }
        if (response.ok) {
        // save the user to local storage
        localStorage.setItem('user', JSON.stringify(json))

        // update the auth context
        dispatch({type: 'LOGIN', payload: json})

        // update loading state
        setIsLoading(false)

        //navigate to userpage
        navigate('/viewprofile/' + username)
        }
    }

    return { signup, isLoading, iserror }
}