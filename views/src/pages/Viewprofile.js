import { useParams, Link } from "react-router-dom"
import useFetch from "../hooks/useFetch"
import Postcard from "../components/Postcard"
import Navbar from "../components/Navbar"
import EditProfileModal from "../components/EditProfileModal"
import Comments from "../components/Comments"
import useFetchSimpleUser from "../hooks/useFetchSimpleUser"
import { useEffect, useState } from "react"
import FileUploadModal from "../components/FileUploadModal"
import { useAuthContext } from "../hooks/useAuthContext"

const Viewprofile = () => {
    const { username } = useParams()
    const { data, isLoading, errorLoading } = useFetch('/api/user/' + username)
    const posts = useFetchSimpleUser('/api/askposts/' + username + '/user')
    const comments = useFetchSimpleUser('/api/askposts/' + username + '/comments')
    const [postActive, setPostActive] = useState(true)
    const [commActive, setCommActive] = useState(false)
    const { user } = useAuthContext()
    const [show, setShow] = useState(false)
    const [editPhoto, setEditPhoto] = useState(false)
    const [userView, setUserView] = useState(false)
    const loggedUser = useFetchSimpleUser(user ? '/api/user/email/' + user.email : '/' + null)

    useEffect(() => {
        if (data && user) {
            if (data[0].email === user.email) {
                setUserView(true)
            } else {
                setUserView(false)
            }
        }
    })

    const handlePost = () => {
        if (!postActive) {
            setCommActive(false)
            setPostActive(true)
        }
    }

    const handleComment = () => {
        if (!commActive) {
            setPostActive(false)
            setCommActive(true)
        }
    }

    return (
        <>
            <div className="nav" class="sticky top-0 z-50">
                <Navbar></Navbar>
            </div>

            {errorLoading && <div>{errorLoading}</div>}
            {isLoading &&
                <div className="text-center w-full m-6">
                    <div role="status">
                        <svg aria-hidden="true" class="inline w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            }

            {data &&
                <div className="user-info" class="w-3/4 m-auto mt-8 p-6">
                    <div className="user-info-content" class="w-full flex items-center">
                        <div className="profile-pic" class="w-[150px] h-[150px] overflow-hidden my-auto">
                            <img src={data[0].img} class="w-[150px] h-[150px] block object-cover" />
                        </div>
                        <div className="user-details" class="w-full mx-4">
                            <div className="display-name" class="p-2">
                                <p class="text-4xl font-bold">{data[0].displayName}</p>
                            </div>
                            <div className="username" class="p-2">
                                <p class="text-d-lasalle font-semibold">@{data[0].username}</p>

                            </div>
                            <div className="user-bio" class="p-2">
                                <p>{data[0].bio}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <div className="user-nav" class="bg-slate-300 py-6">
                <div classname="nav-content" class="w-4/6 flex m-auto justify-between">
                    <div className="links" class="flex gap-8">
                        <a class="block cursor-pointer hover:font-semibold hover:text-teal" onClick={handlePost}>Posts</a>
                        <a class="block cursor-pointer hover:font-semibold hover:text-teal" onClick={handleComment}>Comments</a>
                    </div>
                    {
                        userView &&
                        <div className="edit-profile" class="flex gap-6">
                            <button onClick={() => setShow(true)} class="block hover:font-semibold hover:text-teal">Edit Profile</button>
                            <button onClick={() => setEditPhoto(true)} class="block hover:font-semibold hover:text-teal">Edit Photo</button>
                            {
                                show && <EditProfileModal close={() => setShow(false)} onClose={() => {
                                    setShow(false)
                                    window.location.reload(false)
                                }} show={show} data={data} />}
                            {
                                editPhoto &&
                                <FileUploadModal close={() => setEditPhoto(false)} data={data} />
                            }
                        </div>
                    }
                </div>
            </div>

            {
                (postActive && posts) &&
                posts.map((data) => {
                    return (
                        <div className="user-posts" class="w-3/4 m-auto mt-8 mb-8">
                            <div className="filtered">
                                <Postcard post={data} key={data.postid} loggedUser={loggedUser}></Postcard>
                            </div>
                        </div>

                    )
                })
            }
            {
                (!postActive && comments) &&
                comments.map((comment) => {
                    return (
                        <div className="user-comments" class="w-3/4 m-auto mt-8 mb-8">
                            <Comments comment={comment} loggedUser={loggedUser} />
                        </div>
                    )
                })
            }
        </>
    )
}

export default Viewprofile;