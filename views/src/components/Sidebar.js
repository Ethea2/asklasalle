import { Link } from "react-router-dom";

const Sidebar = ({ useUpvote, useComments, reset }) => {
    return (

        <div className="sidebar">

            <div className="new-post">
                <Link to="/createpost">
                    <button class="w-full p-4 mb-4 rounded-2xl bg-teal text-white font-bold border-4 border-teal text-center ease-in duration-75 hover:bg-dark-navy">Post something!</button>
                </Link>
            </div>

            <div className="organize" class="w-full bg-light-blue-gray rounded-2xl">
                <div className="heading" class="border-2 border-dark-navy bg-dark-navy w-full p-4 rounded-t-2xl">
                    <p class="text-white font-bold">Tags and Filters</p>
                </div>

                <div className="navigation-area" class="border-2 rounded-b-2xl border-dark-navy bg-light-blue-gray">
                    <div className="sort-dropdown" class="group p-4 pb-0 pt-4">
                        <button class="ease-in duration-75 block bg-teal p-4 border-2 border-dark-navy rounded-2xl w-full text-white font-semibold">Sort by...</button>
                        <div className="filters" class="mt-2 ease-in duration-75 group-hover:block hover:block bg-white rounded-2xl py-2">
                            <p onClick={useUpvote} class="cursor-pointer block px-4 py-2 ease-in duration-75 hover:text-emerald-700 hover:font-bold">Upvotes</p>
                            <p onClick={useComments} class="cursor-pointer block px-4 py-2 ease-in duration-75 hover:text-emerald-700 hover:font-bold">Comments</p>
                        </div>
                    </div>

                    <div className="tags" class="p-4 flex flex-col gap-4 ">
                        <div className="select-buttons" class="flex justify-center">
                            <button onClick={reset} class="bg-teal text-white p-2 px-4 rounded ease-in duration-75 hover:bg-mint">Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Sidebar;