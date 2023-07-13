import { Link } from "react-router-dom";

const Sidebar = () => {
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
                            <div className="filters" class="hidden mt-2 ease-in duration-75 group-hover:block hover:block bg-white rounded-2xl py-2">
                                <p class="block px-4 py-2 ease-in duration-75 hover:text-emerald-700 hover:font-bold">Upvotes</p>
                                <p class="block px-4 py-2 ease-in duration-75 hover:text-emerald-700 hover:font-bold">Comments</p>
                            </div>
                    </div>

                    <div className="tags" class="p-4 flex flex-col gap-4 ">
                        <div className="include-tags" class="bg-sky rounded-2xl">
                            <h3 class="p-4 rounded-t-2xl bg-teal border-2 border-dark-navy text-almost-white font-semibold">INCLUDE...</h3>
                            <div className="list" class="p-2 border-2 rounded-2xl rounded-t-none border-t-0 border-dark-navy">
                                <div className="college-list" class="group m-4">
                                    <p class="block duration-75 ease-in group-hover:bg-mint group-hover:text-white group-hover:font-semibold group-hover:px-2 group-hover:py-0.5 group-hover:rounded-lg group-hover:mb-1">College</p>
                                    
                                    <div className="college-filters" class="hidden group-hover:block hover:block bg-white rounded-lg py-2 px-1.5 mt-2">
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Computer Studies</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Education</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Business</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Liberal Arts</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Economics</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Science</p>
                                        <p class="py-0.5 px-2 rounded-lg hover:text-emerald-700 hover:font-bold">Engineering</p>
                                    </div>
                                    
                                    <hr class="bg-dark-navy h-0.5 mt-2"></hr>
                                </div>

                                <div className="college-list" class="group m-4">
                                    <p class="block duration-75 ease-in group-hover:bg-mint group-hover:text-white group-hover:font-semibold group-hover:px-2 group-hover:py-0.5 group-hover:rounded-lg group-hover:mb-1">Degree Program</p>
                                    <div className="college-filters" class="hidden group-hover:block hover:block bg-white rounded-lg py-2 px-1.5 mt-2">
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BS CS-ST</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BS CS-CSE</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BS CS-NIS</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BSMSCS</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BSIT</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BSIS</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">BS IET-GD</p>
                                        <p class="py-0.5 px-2 rounded-lg hover:text-emerald-700 hover:font-bold">BS IET-AD</p>
                                    </div>
                                    <hr class="bg-dark-navy h-0.5 mt-2"></hr>
                                </div>

                                <div className="college-list" class="group m-4">
                                    <p class="block duration-75 ease-in group-hover:bg-mint group-hover:text-white group-hover:font-semibold group-hover:px-2 group-hover:py-0.5 group-hover:rounded-lg group-hover:mb-1">University Processes</p>
                                    <div className="college-filters" class="hidden group-hover:block hover:block bg-white rounded-lg py-2 px-1.5 mt-2">
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Enlistment</p>
                                        <p class="py-0.5 px-2 rounded-lg mb-2 hover:text-emerald-700 hover:font-bold">Pre-Enlistment</p>
                                        <p class="py-0.5 px-2 rounded-lg hover:text-emerald-700 hover:font-bold">Enrollment</p>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        </div>

                        <div className="select-buttons" class="flex justify-between">
                            <button class="bg-teal text-white p-2 px-4 rounded ease-in duration-75 hover:bg-mint">Clear</button>
                            <button class="bg-teal text-white p-2 px-4 rounded ease-in duration-75 hover:bg-mint">Sort & Filter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

     );
}
 
export default Sidebar;