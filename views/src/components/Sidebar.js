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
        </div>

    );
}

export default Sidebar;