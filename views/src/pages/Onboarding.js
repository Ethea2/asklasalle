import { Link } from 'react-router-dom'

const Onboarding = () => {
    return (
        <>
            <div className="header-container" class="w-2/4 m-auto mt-8 p-8 bg-dark-navy border-4 border-teal rounded-2xl">
                <div className="heading" class="w-3/4 m-auto">
                    <p class="text-center font-black text-5xl mb-4">
                        <span className="text-light-blue-gray">Ask</span>
                        <span className="lasalle-logo" class="text-dark-green">Lasalle</span>
                    </p>

                    <p class="text-center text-white italic">Know each other better</p>
                </div>

                <hr class="h-2 w-3/4 mx-auto my-8"></hr>

                <div className="input-fields" class="w-3/4 m-auto">
                    <div className="input-email" class="w-full m-auto mb-6 flex flex-col justify-start">
                            <label htmlFor="email" class="text-white text-xs mb-0.5">Your email</label>
                            <input type="email" name="email" id="email" placeholder="name@dlsu.edu.ph" required="" class="p-2 rounded-lg"/>
                    </div>
                    
                    <div className="input-password" class="w-full m-auto flex flex-col justify-start">
                            <label htmlFor="password" class="text-white text-xs mb-0.5">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" required="" class="p-2 rounded-lg"/>
                    </div>

                    <div className="signin-button" class="flex justify-center mt-6">
                        <Link to="/homepage" className="relative inline-flex items-center justify-start py-3 pl-12 pr-14 overflow-hidden font-semibold text-white transition-all duration-150 ease-in-out rounded hover:pl-14 hover:pr-12 hover:bg-mint group">
                            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out group-hover:h-full"></span>
                            <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Sign-in</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20 sticky bottom-0 text-black text-center bg-light-blue-gray p-6">Don't have an account? <span className="font-bold text-teal"><Link to="/signup">Sign-up</Link></span> now!</div>



        </>

    )
}

export default Onboarding;