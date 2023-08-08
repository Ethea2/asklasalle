import { Link, useNavigate } from 'react-router-dom'
import mainLogo from '../images/logo.png'
import { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import useFetchSimpleUser from '../hooks/useFetchSimpleUser'

const Navbar = () => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const userDetails = useFetchSimpleUser(user ? '/api/user/email/' + user.email : '/' + null)

    useEffect(() => {
        if (userDetails) {
            localStorage.setItem('userDetails', JSON.stringify({ username: userDetails[0].username, userId: userDetails[0]._id }))
        }
    }, [userDetails])

    const submit = (e) => {
        if (e.key === 'Enter') {
            navigate('/search/' + search)
        }
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        navigate('/')
    }
    return (
        <nav className="navbar" class="flex bg-dark-navy justify-between items-center sticky top-0 h-auto p-2.5 overflow-hidden">
            <div className="logo">
                <Link to='/homepage'>
                    <img src={mainLogo} alt="Main Logo" class="w-[100px]" />
                </Link>
            </div>
            <div className="search" class="w-2/5">
                <input onChange={(e) => setSearch(e.target.value)} onKeyDown={submit} type="text" placeholder="Search..." class="p-2.5 w-full rounded-xl border-none bg-slate-100" />
            </div>
            <div className="links"
                class="flex items-center">
                {
                    user &&
                    <div className='flex gap-2 items-center'>
                        {
                            userDetails &&
                            <Link to={'/viewprofile/' + userDetails[0].username}>
                                <div class="flex p-2 rounded-xl bg-sky gap-2">
                                    <div className="rounded-full w-7 h-7 overflow-hidden">
                                        <img src={userDetails[0].img} class="block object-cover" />
                                    </div>
                                    {userDetails[0].username}
                                </div>
                            </Link>
                        }
                        <div className="logout cursor-pointer" onClick={(e) => handleLogout(e)} class="bg-sky p-2.5 rounded-xl">
                            <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 471.2 471.2" width="20px" height="20px" class="cursor-pointer">
                                <g><g><path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5
                                        s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5
                                        S235.019,444.2,227.619,444.2z"/><path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5
                                        s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8
                                        C455.319,239.9,455.319,231.3,450.019,226.1z"/></g></g>
                            </svg>
                        </div>
                    </div>
                }
                {
                    !user &&
                    <Link to='/'>
                        <div className="logout cursor-pointer" class="bg-sky p-2.5 rounded-xl">
                            <p className='cursor-pointer'>Login</p>
                        </div>
                    </Link>
                }

            </div>
        </nav >
    )
}

export default Navbar;