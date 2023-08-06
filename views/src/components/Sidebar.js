import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const Sidebar = ({ useUpvote, useComments, reset }) => {
    const { user } = useAuthContext()
    return (

        <div className="sidebar">
            {
                user &&
                <div className="new-post">
                    <Link to="/createpost">
                        <button class="w-full mb-4 p-4 rounded-2xl bg-teal text-white font-bold border-4 border-dark-navy text-center ease-in duration-75 hover:bg-dark-navy">Post something!</button>
                    </Link>
                </div>
            }


            <div className="organize" class="w-full">
                <div className="header" class="p-4 font-semibold">
                    <p className="title">Sort by...</p>
                </div>
                <hr class="border border-teal mx-4"></hr>
                <div className="filters" class="m-4">
                    <p onClick={useUpvote} class="py-2 cursor-pointer block rounded-lg ease-in duration-150 hover:bg-gradient-to-l hover:from-sky to-mint hover:px-4 hover:font-bold">Upvotes</p>
                    <p onClick={useComments} class="py-2 cursor-pointer block rounded-lg ease-in duration-150 hover:bg-gradient-to-l hover:from-sky to-mint hover:px-4 hover:font-bold">Comments</p>
                </div>
                <div className="clear" class="p-4">
                    <button onClick={reset} class="bg-teal text-white p-2 px-4 rounded ease-in duration-75 hover:bg-mint">Clear</button>
                </div>
            </div>

            <hr class="border border-teal mx-4"></hr>

            <div className="footer">
                <Link to="/About"><div className="about-page" class="mt-10 mx-4 flex items-center px-4 py-2 gap-1.5 bg-gradient-to-b from-mint to-teal rounded-xl">
                <div className="icon">
                    <svg width="20" height="20" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>about</title>
                        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="about-white" fill="#000000" transform="translate(42.666667, 42.666667)">
                        <path d="M213.333333,3.55271368e-14 C95.51296,3.55271368e-14 3.55271368e-14,95.51168 3.55271368e-14,213.333333 C3.55271368e-14,331.153707 95.51296,426.666667 213.333333,426.666667 C331.154987,426.666667 426.666667,331.153707 426.666667,213.333333 C426.666667,95.51168 331.154987,3.55271368e-14 213.333333,3.55271368e-14 Z M213.333333,384 C119.227947,384 42.6666667,307.43872 42.6666667,213.333333 C42.6666667,119.227947 119.227947,42.6666667 213.333333,42.6666667 C307.44,42.6666667 384,119.227947 384,213.333333 C384,307.43872 307.44,384 213.333333,384 Z M240.04672,128 C240.04672,143.46752 228.785067,154.666667 213.55008,154.666667 C197.698773,154.666667 186.713387,143.46752 186.713387,127.704107 C186.713387,112.5536 197.99616,101.333333 213.55008,101.333333 C228.785067,101.333333 240.04672,112.5536 240.04672,128 Z M192.04672,192 L234.713387,192 L234.713387,320 L192.04672,320 L192.04672,192 Z" id="Shape"></path></g></g>
                    </svg>
                </div>
                    <p>About</p>
                </div>
                </Link>
            </div>
        </div>

    );
}

export default Sidebar;