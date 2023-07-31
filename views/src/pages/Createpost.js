import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import useFetchSimpleUser from '../hooks/useFetchSimpleUser'
import { useAuthContext } from "../hooks/useAuthContext";

const Createpost = () => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const navigate = useNavigate();
    const { user } = useAuthContext()
    const [username, setUsername] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error) {
            toast(error)
        }
    }, [error])

    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem('userDetails')).username)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            toast("You must be logged in")
        }

        console.log(user.user)

        const post = { username, title, body }

        const response = await fetch(apiUrl + '/api/askposts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError('❌ ' + json.error)
        }

        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            navigate(-1)
            console.log('new post addded')
        }
    }
    return (

        <>
            <div className="nav" class="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>
            {
                user ?
                    <div className="create-post mt-14">
                        <div className="form-container" class="border border-black w-4/5 p-6 flex flex-col m-auto">
                            <div className="header w-11/12 flex mb-4 m-auto">
                                <h1 class="text-2xl font-extrabold">Create a new post</h1>
                            </div>

                            <div className="body w-11/12 flex flex-col gap-4 m-auto">

                                <div className="title flex flex-col gap-2">
                                    <label class="text-xl font-bold text-teal">Post Title</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} class="border border-neutral-300 bg-neutral-200 p-2 rounded-lg shadow-md shadow-gray-300" />
                                </div>

                                <div className="post-body flex flex-col gap-2">
                                    <label class="text-xl font-bold text-teal">Post Body</label>
                                    <textarea type="text" onChange={(e) => setBody(e.target.value)} value={body} class="border border-neutral-300 bg-neutral-200 p-8 rounded-lg shadow-md shadow-gray-300" />
                                </div>

                            </div>

                            <div className="footer w-11/12 mt-8 m-auto flex justify-between">

                                <div className="post-anon flex justify-center">
                                    <div className="anon-container bg-gray-300 rounded-lg px-4 py-2 flex gap-2">
                                        <label value={'anon_user'} class="font-semibold text-sm">Posting anonymously</label>
                                    </div>
                                </div>

                                <div className="buttons flex gap-8">
                                    <button onClick={() => navigate(-1)} class="text-red-700 font-semibold">Cancel</button>
                                    <button onClick={handleSubmit} class="bg-teal text-white font-semibold px-8 py-2 rounded-xl">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="text-center">
                        <div role="status">
                            <svg aria-hidden="true" class="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
            }
        </>

    );
}

export default Createpost;