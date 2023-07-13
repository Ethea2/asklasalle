import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Createpost = () => {

    const navigate = useNavigate();

    return (

       <>

        <div className="nav" class="sticky top-0 z-50">
            <Navbar></Navbar>
        </div>
       
        <div className="post-details" class="w-4/5 m-auto my-16">
            <div className="heading" class=" w-4/5 mx-auto my-8">
                <h1 class="text-5xl font-black text-slate-500">Create Post</h1>
                <hr class="bg-slate-400 h-0.5 my-2"/>
            </div>

            <div className="post-title" class="w-4/5 mx-auto mb-4">
                <input type="text" placeholder="Post Title..." class="w-full p-4 rounded-lg bg-stone-300"></input>
            </div>

            <div className="post-body" class="w-4/5 mx-auto mt-4">
                <input type="text" placeholder="Type something..." class="w-full px-4 py-8 rounded-lg bg-stone-300"></input>
            </div>

            <div className="tags" class="w-4/5 mx-auto mt-4">
                <button class="py-0.5 px-2 bg-stone-200 rounded-lg drop-shadow-lg border-slate-200 border">Add tags</button>
            </div>

            <div className="post-choices" class="w-4/5 mx-auto mt-8 flex justify-between">
                <div className="anon">
                    <button class="p-2 bg-stone-300 rounded-lg">Post Anonymously</button>
                </div>

                <div className="upload" class="flex justify-between gap-4">
                    <Link to="/homepage"><button class="px-4 py-2 bg-green-600 rounded-lg">Post</button></Link>
                    <button class="px-4 py-2 bg-stone-300 rounded-lg" onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </div>
        </div>
       
       </>

     );
}
 
export default Createpost;