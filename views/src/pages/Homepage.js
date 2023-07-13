import useFetch from "../hooks/useFetch"
import Navbar from "../components/Navbar";
import Postcard from "../components/Postcard";
import Sidebar from "../components/Sidebar";
// import { Link } from 'react-router-dom'

const Homepage = () => {
    const {data, isLoading, errorLoading} = useFetch('http://localhost:8000/posts')
    
    return (
        <>
            <div className="nav" class="sticky top-0 z-50">
                <Navbar /> 
            </div>

            <div className="homepage flex">
                <div className="w-80 m-14">
                    <Sidebar />
                </div>
                <div className="flex-col w-2/3 mt-14 mr-14">
                    {errorLoading && <div>{errorLoading}</div>}
                    {isLoading && <div>loading...</div>}
                    { data &&
                        data.map((post) => {
                            return (
                                <Postcard post={post} key={post.postid}></Postcard>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Homepage;