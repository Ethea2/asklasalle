import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { toast } from 'react-toastify'

const Onboarding = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, isLoading, iserror } = useLogin()
    let button;
    const [stayLogged, setStayLogged] = useState(false)

    const toggleLogged = () => {
        if (stayLogged) {
            setStayLogged(false)
        } else {
            setStayLogged(true)
        }
    }

    useEffect(() => {
        if (iserror) {
            toast(iserror)
        }
    }, [iserror])

    const submit = (e) => {
        e.preventDefault()
        localStorage.setItem('staylogged', stayLogged)
        login(email, password, stayLogged)
    }



    if (!isLoading) {
        button =
            <div onClick={submit} className="cursor-pointer relative inline-flex items-center justify-start py-3 pl-12 pr-14 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-14 hover:pr-12 hover:bg-mint group">
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out group-hover:h-full"></span>
                <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="relative w-full text-center transition-colors duration-200 ease-in-out group-hover:text-white">Sign-in</span>
            </div>
    } else {
        button =
            <div class="text-center">
                <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
    }

    return (
        <>
            <div className="header-container" class="w-2/4 m-auto mt-4 p-8 bg-dark-navy border-4 border-teal rounded-2xl">
                <div className="heading" class="w-3/4 m-auto">
                    <p class="text-center font-black text-5xl mb-4">
                        <span className="text-light-blue-gray">Ask</span>
                        <span className="lasalle-logo" class="text-dark-green">Lasalle</span>
                    </p>

                    <p class="text-center text-white italic">Know each DLSU better</p>
                </div>

                <hr class="h-2 w-3/4 mx-auto my-8"></hr>

                <div className="input-fields" class="w-3/4 m-auto">
                    <div className="input-email" class="w-full m-auto mb-6 flex flex-col justify-start">
                        <label htmlFor="email" class="text-white text-xs mb-0.5">Your email</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder="name@dlsu.edu.ph" required="" class="p-2 rounded-lg" />
                    </div>

                    <div className="input-password" class="w-full m-auto flex flex-col justify-start">
                        <label htmlFor="password" class="text-white text-xs mb-0.5">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" required="" class="p-2 rounded-lg" />
                    </div>

                    <div className="enter-app" class="flex flex-col w-1/2 mt-4 m-auto justify-between">
                        {button}
                        <Link to="/homepage" class="mt-4 font-semibold bg-mint rounded-lg text-center p-2">
                            Browse as guest
                        </Link>
                    </div>

                    <div class="space-y-3">
                        <div class="flex space-x-2">
                            <div class="flex h-5 items-center">
                                <input type="checkbox"  defaultChecked={false} onChange={toggleLogged} id="example7" name="checkGroup1" class="h-4 w-4 rounded border-gray-300 text-primary-600 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 focus:ring-offset-0 disabled:cursor-not-allowed disabled:text-gray-400" />
                            </div>
                            <label for="example7" class="text-sm">
                                <div class="font-medium text-white">Remember me</div>
                                <p class="text-gray-300">Keep me logged in for next time.</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 sticky bottom-0 text-black text-center bg-light-blue-gray p-6">Don't have an account? <span className="font-bold text-teal"><Link to="/signup">Sign-up</Link></span> now!</div>



        </>

    )
}

export default Onboarding;