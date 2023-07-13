import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';
import Sharemodal from "./Sharemodal";

const Comments = ({ comment }) => {
    const [saved, setSaved] = useState(false)
    const [share, setShare] = useState(false)

    const save = () => {

        if (saved) {
            setSaved(false)
        } else {
            toast("💾 The post has been saved!")
            setSaved(true)
        }
    }
    const shareUse = () => {

        if (share) {
            setShare(false)
        } else {
            setShare(true)
        }
    }

    return (
        <>
            <div className="comment" class="mb-4 bg-light-blue-gray border border-dark-navy rounded-2xl flex">
                <div className="main-content" class="w-full py-2 px-4">
                    <p class="p-2"><Link to={'/viewprofile/' + comment.user}><span class="font-bold text-d-lasalle">@{comment.user}</span> </Link>replied...</p>

                    <hr class="bg-neutral-400 h-0.5 mx-2"></hr>

                    <p class="p-2 mt-2 font-semibold text-lg">{comment.comment}</p>

                    <div className="interaction-options" class="flex justify-between mt-6 mb-2 px-2">

                        <div className="votes-replies" class="flex gap-12">
                            <div className="votes" class="flex justify-between gap-4">
                                <div className="upvotes">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bg-inherit" width="20px" height="20px" viewBox="0 0 512 512" version="1.1">
                                        <title>triangle-filled</title>
                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)">
                                                <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>

                                <div className="downvotes">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="bg-inherit" width="20px" height="20px" viewBox="0 0 512 512" version="1.1" class="rotate-180">
                                        <title>triangle-filled</title>
                                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="drop" fill="#000000" transform="translate(32.000000, 42.666667)">
                                                <path d="M246.312928,5.62892705 C252.927596,9.40873724 258.409564,14.8907053 262.189374,21.5053731 L444.667042,340.84129 C456.358134,361.300701 449.250007,387.363834 428.790595,399.054926 C422.34376,402.738832 415.04715,404.676552 407.622001,404.676552 L42.6666667,404.676552 C19.1025173,404.676552 7.10542736e-15,385.574034 7.10542736e-15,362.009885 C7.10542736e-15,354.584736 1.93772021,347.288125 5.62162594,340.84129 L188.099293,21.5053731 C199.790385,1.04596203 225.853517,-6.06216498 246.312928,5.62892705 Z" id="Combined-Shape">
                                                </path>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>

                            <div className="comments" class="flex gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" class="my-auto"><path d="M13,11H7a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm4-4H7A1,1,0,0,0,7,9H17a1,1,0,0,0,0-2Zm2-5H5A3,3,0,0,0,2,5V15a3,3,0,0,0,3,3H16.59l3.7,3.71A1,1,0,0,0,21,22a.84.84,0,0,0,.38-.08A1,1,0,0,0,22,21V5A3,3,0,0,0,19,2Zm1,16.59-2.29-2.3A1,1,0,0,0,17,16H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z" /></svg>
                                <p class="">{comment.comments} 0</p>
                            </div>
                        </div>


                        <div className="bookmark-share" class="flex gap-4">
                            <div className="bookmark" class="cursor-pointer" onClick={save}>
                                {
                                    !saved &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="my-auto">
                                        <path d="M17.9999 21C17.8278 20.9996 17.6587 20.9549 17.5089 20.87L11.8359 17.663L6.5129 20.863C6.36079 20.9539 6.18725 21.0028 6.01005 21.0046C5.83285 21.0064 5.65836 20.961 5.50443 20.8732C5.3505 20.7854 5.22267 20.6583 5.13402 20.5049C5.04537 20.3514 4.99908 20.1772 4.9999 20V5.334C4.9832 4.73305 5.20536 4.14997 5.61772 3.7125C6.03008 3.27503 6.59901 3.01882 7.1999 3H16.7999C17.4007 3.01908 17.9695 3.27537 18.3818 3.71278C18.7941 4.1502 19.0163 4.73312 18.9999 5.334V20C18.9999 20.2652 18.8945 20.5196 18.707 20.7071C18.5195 20.8946 18.2651 21 17.9999 21ZM11.8209 15.506C11.9933 15.5059 12.1628 15.5503 12.3129 15.635L16.9999 18.286V5.334C16.9999 5.134 16.8799 5 16.7999 5H7.1999C7.1199 5 6.9999 5.133 6.9999 5.334V18.234L11.3059 15.648C11.4615 15.5548 11.6395 15.5058 11.8209 15.506Z" fill="black" />
                                    </svg>
                                }
                                {
                                    saved &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" class="my-auto">
                                        <path d="M17.9999 21C17.8278 20.9996 17.6587 20.9549 17.5089 20.87L11.8359 17.663L6.5129 20.863C6.36079 20.9539 6.18725 21.0028 6.01005 21.0046C5.83285 21.0064 5.65836 20.961 5.50443 20.8732C5.3505 20.7854 5.22267 20.6583 5.13402 20.5049C5.04537 20.3514 4.99908 20.1772 4.9999 20V5.334C4.9832 4.73305 5.20536 4.14997 5.61772 3.7125C6.03008 3.27503 6.59901 3.01882 7.1999 3H16.7999C17.4007 3.01908 17.9695 3.27537 18.3818 3.71278C18.7941 4.1502 19.0163 4.73312 18.9999 5.334V20C18.9999 20.2652 18.8945 20.5196 18.707 20.7071C18.5195 20.8946 18.2651 21 17.9999 21ZM11.8209 15.506C11.9933 15.5059 12.1628 15.5503 12.3129 15.635L16.9999 18.286V5.334C16.9999 5.134 16.8799 5 16.7999 5H7.1999C7.1199 5 6.9999 5.133 6.9999 5.334V18.234L11.3059 15.648C11.4615 15.5548 11.6395 15.5058 11.8209 15.506Z" fill="#176B87" />
                                    </svg>
                                }
                            </div>
                            <div className="share" class="cursor-pointer" onClick={shareUse}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="none" d="M0 0h24v24H0z" class="my-auto" /><path d="M10 3v2H5v14h14v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm7.586 2H13V3h8v8h-2V6.414l-7 7L10.586 12l7-7z" fill="#000" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                share &&
                <Sharemodal shareUse={shareUse}/>
            }
        </>
    )
}

export default Comments