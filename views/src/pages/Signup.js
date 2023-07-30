import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify'

export const Signup = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmation] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()


        if (!email.endsWith("@dlsu.edu.ph")) {
            toast("❌ Your email is not from DLSU!")
            setError(true)
            return
        }
        else if (password !== confirmPass) {
            toast("❌ Confirm password and password is not the same!")
            setError(true)
            return
        }

        const user = { username, email, password }

        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(true)
            console.log(json)
        }

        if (response.ok) {
            setUsername('')
            setEmail('')
            setPassword('')
            setError(null)
            navigate('/viewprofile/' + username)
            console.log('new user addded')
        }
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

                <div className="create-acc-button" class="flex justify-center mt-6">
                    <button onClick={handleSubmit} class="w-max py-2 px-6 rounded-xl bg-teal ease-in duration-75 hover:bg-mint hover:text-dark-navy hover:font-semibold">Create Account</button>
                </div>

                <div className="cancel-button" class="flex justify-center mt-6">
                    <button class="text-white underline text-xs" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>

        </>
    )
}

export default Signup;


