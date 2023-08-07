import Navbar from "../components/Navbar"

const About = () => {
    return (
        <>
            <Navbar />

            <div className="header" class="w-2/3 flex mt-10 m-auto p-6 justify-center bg-gradient-to-b from-dark-navy to-teal rounded-2xl">
                <p class="text-4xl font-black text-sky">About AskLasalle</p>
            </div>

            <div className="body-1" class="w-2/3 flex flex-col mt-10 mb-10 m-auto p-6 justify-center bg-gradient-to-b from-teal to-dark-navy rounded-2xl">
                <div className="description" class="p-4">
                    <h3 class="mb-4 text-m font-bold underline text-white">What is AskLasalle?</h3>
                    <p class="text-white font-light text-justify text-s">AskLasalle is a public forum for Lasallian students who wish to consult with their fellow Lasallians about anything they can think of under the sun, or even beyond! It is a platform for, as per its namesake, asking! This app envisions a univerisity body that is able to bond through shared struggles, similar interests, and lived experiences. It is a place to get to know the ins and outs of DLSU, whether it is in the context of academic processes, campus cultures, student services, and more. AskLasalle aims to serve as a one-stop-shop to address and answer any questions a student might have.</p>
                </div>
            </div>
            <div className="body-2" class="w-2/3 flex flex-col mt-10 mb-10 m-auto p-6 justify-center bg-gradient-to-b from-dark-navy to-teal rounded-2xl">
                <div className="credits" class="p-4">
                    <h3 class="mb-4 text-m font-bold underline text-white">Credits:</h3>
                    <div className="dependencies" class="m-auto">
                        <p class="mb-4 text-xs text-white font-semibold">The development of this app was made possible with the following resources that were used as dependecies:</p>
                        <div className="container" class="m-auto justify-between flex flex-row">
                            <div className="left-cont" class="text-xs text-white">
                                <p className="text-base">front-end:</p>
                                <p>testing-library/jest-dom: 5.16.5</p>
                                <p>testing-library/react: 13.4.0,</p>
                                <p>testing-library/user-event: 13.5.0</p>
                                <p>axios: 1.4.0</p>
                                <p>json-server: 0.17.3</p>
                                <p>react: 18.2.0</p>
                                <p>react-dom: 18.2.0</p>
                                <p>react-infinite-scroll-component: 6.1.0</p>
                                <p> react-router-dom: 6.12.1</p>
                                <p>react-scripts: 5.0.1</p>
                                <p>react-toastify: 9.1.3</p>
                                <p>web-vitals: 2.1.4</p>
                            </div>
                            <div className="right-cont" class="text-xs text-white text-end">
                                <p className="text-base">backend:</p>
                                <p>bcrypt: 5.1.0</p>
                                <p>cloudinary: 1.38.0</p>
                                <p>cors: 2.8.5</p>
                                <p>dotenv: 16.3.1</p>
                                <p>express: 4.18.2</p>
                                <p>express-fileupload: 1.4.0</p>
                                <p>jsonwebtoken: 9.0.1</p>
                                <p>mongodb: 5.7.0</p>
                                <p>mongoose: 7.3.4</p>
                                <p>unique-names-generator: 4.7.1</p>
                                <p>validation: 0.0.1</p>
                                <p>validator: 13.9.0</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright" class="mt-2 px-4 py-2 text-center mb-10">
                <p class="font-semibold text-xs text-gray-400"> &copy; 2023 | AskLasalle</p>
            </div>
        </>
    )
}

export default About