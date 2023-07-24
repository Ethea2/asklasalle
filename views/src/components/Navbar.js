import { Link, useNavigate } from 'react-router-dom'
import mainLogo from '../images/logo.png' 
import { useEffect, useState } from 'react'

const Navbar = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    const submit = (e) => {
        if (e.key === 'Enter') {
            navigate('/search/' + search)
        } 
    }

    return (
        <nav className="navbar" class="flex bg-dark-navy justify-between items-center sticky top-0 h-auto p-2.5 overflow-hidden">
            <div className="logo">
                <Link to='/homepage'>
                    <img src={mainLogo} alt="Main Logo" class="w-[100px]"/>
                </Link>
            </div>
            <div className="search" class="w-2/5">
                <input onChange={(e) => setSearch(e.target.value)} onKeyDown={submit} type="text" placeholder="Search..." class="p-2.5 w-full rounded-xl border-none bg-slate-100"/>
            </div>
            <div className="links"
                class="
                 flex
                 items-center
                 gap-x-5">
                <div className="logout" class="bg-sky p-2.5 rounded-xl">
                    <Link to="/"><p>Logout</p></Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;