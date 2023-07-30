import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmation] = useState('')
    const [error, setError] = useState('')
    const { signup, iserror, isLoading } = useSignup()
    let button;

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (iserror) {
    //         toast(iserror)
    //     }
    // }, [iserror])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (iserror) {
            toast(iserror)
        }
        else if (!email.endsWith("@dlsu.edu.ph")) {
            toast("❌ Your email is not from DLSU!")
            setError(true)
            return
        } 
        else if (password !== confirmPass) {
            toast("❌ Confirm password and password is not the same!")
            setError(true)
            return
        }

        await signup(email, password, username)
    }

    if (!isLoading) {
        button =
            <div className="create-acc-button" class="flex justify-center mt-6">
                <button onClick={handleSubmit} class="w-max py-2 px-6 rounded-xl bg-teal ease-in duration-75 hover:bg-mint hover:text-dark-navy hover:font-semibold">Create Account</button>
            </div>
    } else {
        button =
            <div className="create-acc-button" class="flex justify-center mt-6">
                <button disabled type="button" class="w-max py-2 px-6 rounded-xl bg-teal ease-in duration-75 hover:bg-mint hover:text-dark-navy hover:font-semibold">
                    <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                    Loading...
                </button>
            </div>
    }

    return (
        <>
            <div className="header-container" class="w-2/4 m-auto mt-6 mb-6 p-4 bg-dark-navy border-4 border-teal rounded-2xl">
                <div className="heading" class="w-3/4 m-auto mt-2.5">
                    <p class="text-center text-mint font-black text-3xl mb-4">
                        Join us today!
                    </p>
                </div>

                <hr class="h-2 w-3/4 mx-auto my-6"></hr>

                <div className="input-fields" class="w-3/4 m-auto">
                    <div className="input-username" class="w-full m-auto mb-6 flex flex-col justify-start">
                        <label htmlFor="username" class="text-white text-xs mb-0.5">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} type="text" required="true" class="p-2 rounded-lg" />
                    </div>

                    <div className="input-email" class="w-full m-auto mb-6 flex flex-col justify-start">
                        <label htmlFor="email" class="text-white text-xs mb-0.5">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" name="email" id="email" required="" class="p-2 rounded-lg" />
                    </div>

                    <div className="input-password" class="w-full m-auto mb-6 flex flex-col justify-start">
                        <label htmlFor="password" class="text-white text-xs mb-0.5">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" name="password" id="password" required="" class="p-2 rounded-lg" />
                    </div>

                    <div className="input-password-confirmation" class="w-full m-auto mb-6 flex flex-col justify-start">
                        <label htmlFor="password" class="text-white text-xs mb-0.5">Confirm Password</label>
                        <input onChange={(e) => setConfirmation(e.target.value)} value={confirmPass} type="password" name="password" id="password" required="" class="p-2 rounded-lg" />
                    </div>
                </div>

                {button}

                <div className="cancel-button" class="flex justify-center mt-6">
                    <button class="text-white underline text-xs" onClick={() => navigate(-1)}>Cancel</button>
                </div>

            </div>
        </>
    )
}

export default Signup;


