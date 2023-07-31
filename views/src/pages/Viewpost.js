import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import PostcardFull from "../components/PostcardFull";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments"
import useFetchSimpleUser from "../hooks/useFetchSimpleUser";
import AddComment from "../components/AddComment";
import { useAuthContext } from "../hooks/useAuthContext";

const Viewpost = () => {
    const { postid } = useParams()
    const { user } = useAuthContext()
    const { data, isLoading, errorLoading } = useFetch('/api/askposts/' + postid)
    const comments = useFetchSimpleUser('/api/askposts/' + postid + '/comment')
    const loggedUser = useFetchSimpleUser(user ? '/api/user/email/' + user.email : null)

    return (
        <>
            <div className="nav" class="sticky top-0 z-50">
                <Navbar />
            </div>

            {errorLoading && <div>{errorLoading}</div>}
            {isLoading && <div>loading...</div>}
            {data &&
                <div className="post" class="w-3/5 m-auto mt-12">
                    <PostcardFull post={data} key={data._id} loggedUser={loggedUser}></PostcardFull>
                </div>


            }

            <div className="comment-section" class="w-3/5 m-auto mt-6">

                <div className="comments-heading" class="p-4">
                    <h2 class="font-bold text-2xl">Replies</h2>
                </div>

                <hr class="bg-stone-500 h-0.5 mx-4"></hr>

                {
                    user &&
                    <div className="add-comment-sec" class="w-full mt-4 p-4">
                        <AddComment data={data} />
                    </div>
                }

                <div className="comment-container" class="w-full mt-2 p-4">

                    {comments && comments.map((comment) => {
                        return (
                            <Comments comment={comment} postid={postid} loggedUser={loggedUser}/>
                        )
                    })
                    }
                </div>
            </div>

        </>
    )
}

export default Viewpost;
