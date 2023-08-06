import useFetch from "../hooks/useFetch"
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Postcard from "../components/Postcard";
import Sidebar from "../components/Sidebar";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetchSimpleUser from "../hooks/useFetchSimpleUser";
import axios from "axios";
// import { Link } from 'react-router-dom'

const Homepage = () => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const { user } = useAuthContext()
    const [upvotes, setUpvotes] = useState(false)
    const [comments, setComments] = useState(false)
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState()
    const loggedUser = useFetchSimpleUser(user ? '/api/user/email/' + user.email : '/' + null)

    useEffect(() => {
        setLoading(true)
        const fetchPosts = async () => {
            const res = await axios(apiUrl + `/api/askposts?page=${page}`)
            setData(res.data)
            setLoading(false)
        }
        fetchPosts()
    }, [])

    const fetchData = () => {
        setPage(page + 1)
        const fetchPosts = async () => {
            const res = await axios(apiUrl + `/api/askposts?page=${page + 1}`)
            if (res.data.length === 0) {
                setHasMore(false)
            } else {    
                setData([...data, ...res.data])
            }
        }
        fetchPosts()
    } 

    const useUpvote = () => {
        setComments(false)
        setUpvotes(true)
    }

    const useComments = () => {
        setUpvotes(false)
        setComments(true)
    }

    const reset = () => {
        setUpvotes(false)
        setComments(false)
    }

    return (
        <>
            <div className="nav" class="sticky top-0 z-50">
                <Navbar />
            </div>

            <div className="homepage flex">
                <div className="w-80 m-14">
                    <Sidebar useUpvote={useUpvote} useComments={useComments} reset={reset} />
                </div>
                <div className="flex-col w-2/3 mt-14 mr-14 overflow-hidden">
                    {loading &&
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

                    <InfiniteScroll
                        className="overflow-hidden"
                        dataLength={data.length}
                        next={fetchData}
                        hasMore={hasMore}
                        loader={
                            <div className="text-center">
                                <div role="status">
                                    <svg aria-hidden="true" class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        }
                        endMessage={
                            <div class="w-1/2 mb-8 flex flex-row gap-2 justify-center p-2 m-auto bg-gradient-to-b from-sky to-mint rounded-2xl">
                                    <div className="icon" class="flex items-center justify-center">
                                        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="24" height="24" fill="none"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#323232"/>
                                        </svg>
                                    </div>
                                    <div className="end-text" class="flex items-center justify-center">
                                        <p>You're all caught up! <Link to="/createpost"><span class="font-semibold text-teal underline">Create a new post!</span></Link></p>
                                        
                                    </div>
                            </div>
                        }
                    >

                        {
                            (data && upvotes) &&
                            data.sort((a, b) => b.upVote - a.upVote).map((post) => {
                                return (
                                    <Postcard post={post} key={post._id} loggedUser={loggedUser} ></Postcard>
                                )
                            })
                        }

                        {
                            (data && comments) &&
                            data.sort((a, b) => b.replies.length - a.replies.length).map((post) => {
                                return (
                                    <Postcard post={post} key={post._id} loggedUser={loggedUser} ></Postcard>
                                )
                            })
                        }

                        {((data && !upvotes) && (data && !comments)) &&
                            data.sort((a,b) => b.createdAt.localeCompare(a.createdAt)).map((post) => {
                                return (
                                    <Postcard post={post} key={post._id} loggedUser={loggedUser} ></Postcard>
                                )
                            })
                        }

                    </InfiniteScroll>
                </div>
            </div>
        </>
    );
}

export default Homepage;