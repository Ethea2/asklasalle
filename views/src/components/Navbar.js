import { Link, useNavigate } from 'react-router-dom'
import mainLogo from '../images/logo.png'
import { useEffect, useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import useFetchSimpleUser from '../hooks/useFetchSimpleUser'

const Navbar = () => {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const { logout } = useLogout()
    const userDetails = useFetchSimpleUser(user ? '/api/user/email/' + user.email : null)

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
                class="
                 flex
                 items-center
                 gap-x-5">
                {
                    user &&
                    <div className='flex items-center'>
                        {
                            userDetails &&
                            <Link to={'/viewprofile/' + userDetails[0].username}>
                                <div className='text-emerald-300 flex'>
                                    {userDetails[0].username}
                                    <div className="rounded-full w-7 h-7 overflow-hidden">
                                        <img src={userDetails[0].img} class="block object-cover" />
                                    </div>
                                </div>
                            </Link>
                        }
                        <div className="logout cursor-pointer" onClick={(e) => handleLogout(e)} class="bg-sky p-2.5 rounded-xl">
                            <p className='cursor-pointer'>Logout</p>
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