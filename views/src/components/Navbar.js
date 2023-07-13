import { Link } from 'react-router-dom'
import mainLogo from '../images/logo.png' 

const Navbar = () => {
    return (
        <nav className="navbar" class="flex bg-dark-navy justify-between items-center sticky top-0 h-auto p-2.5 overflow-hidden">
            <div className="logo">
                <Link to='/homepage'>
                    <img src={mainLogo} alt="Main Logo" class="w-[100px]"/>
                </Link>
            </div>
            <div className="search" class="w-2/5">
                <input type="text" placeholder="Search..." class="p-2.5 w-full rounded-xl border-none bg-slate-100"/>
            </div>
            <div className="links"
                class="
                 flex
                 items-center
                 gap-x-5">
                <div className="notifications" class="bg-sky p-2.5 rounded-xl">
                    <p>Notifs</p>
                </div>
                <div className="logout" class="bg-sky p-2.5 rounded-xl">
                    <Link to="/"><p>Logout</p></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;