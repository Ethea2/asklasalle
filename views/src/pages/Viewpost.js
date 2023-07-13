import { useParams, Link } from "react-router-dom";
import useFetchPost from "../hooks/useFetchPost";
import { useEffect, useState } from "react";
import PostcardFull from "../components/PostcardFull";
import Navbar from "../components/Navbar";
import Comments from "../components/Comments"

const Viewpost = () => {
    const { postid } = useParams()
    const { data, isLoading, errorLoading } = useFetchPost('http://localhost:8000/posts', postid)

    const [comments, setComments] = useState()
    useEffect(() => {
        if (isLoading === false) {
            setComments(data.postcomments)
        }
    }, [isLoading])

    return (
        <>

        <div className="nav" class="sticky top-0 z-50">
            <Navbar></Navbar>
        </div>

            {errorLoading && <div>{errorLoading}</div>}
            {isLoading && <div>loading...</div>}
            {data &&
                <div className="post" class="w-3/5 m-auto mt-12">
                    <PostcardFull post={data} key={data.postid}></PostcardFull>
                    <Link to={'/viewpost/' + postid + '/edit'}>View post as user</Link>
                </div>


            }

            <div className="comment-section" class="w-3/5 m-auto mt-6">

                <div className="comments-heading" class="p-4">
                    <h2 class="font-bold text-2xl">Replies</h2>
                </div>

                <hr class="bg-stone-500 h-0.5 mx-4"></hr>

                <div className="comment-container" class="w-full mt-6 p-4">

                    {comments && comments.map((comment) => {
                        return (
                            <Comments comment={comment}/>
                        )
                    })
                    }
                </div>
            </div>

        </>
    )
}

export default Viewpost;
