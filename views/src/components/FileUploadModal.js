import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext } from "../hooks/useAuthContext"

const FileUploadModal = ({ close, data }) => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const [img, setImg] = useState([])
    const [loading, setLoading] = useState(false)
    const { user } = useAuthContext()
    let button;
    const handleImage = (e) => {
        const file = e.target.files[0]
        setImg(file)
    }
    // const setFileToBase = (file) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onloadend = () => {
    //         setImg(reader.result)
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (img.length === 0) {
            return toast("❌ You did not upload an image!")
        }

        try {

            setLoading(true)
            const form = new FormData()
            form.append("img", img)
            form.append("_method", "PATCH")
            axios.post(apiUrl + '/api/user/' + data[0]._id + "/picture", form, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }).then((data) => {
                setImg('')
                window.location.reload(false)
            })
                .catch(err => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>

            <div className="modal" class="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="modal-content" class="w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                    <div className="modal-header" class="px-10 py-6 bg-teal rounded-t-2xl border        border-black">
                        <h3 className="modal-title" class="m-0 text-white">Edit User Profile</h3>
                    </div>

                    <div className="modal-body" class="px-10 py-8 border-l border-r border-black">
                        <div className="upload-file" class="flex flex-col gap-0.5 mb-2">

                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                            <input accept="image/*" onChange={handleImage} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                        </div>

                        {
                            !loading &&
                            <div className="modal-footer" class="mt-10 w-full flex justify-between">
                                <button onClick={handleSubmit} class="px-4 py-2 bg-mint text-white rounded-lg">Save changes</button>
                                <button onClick={close} class="px-4 py-2 bg-red-400 text-white rounded-lg">Cancel</button>
                            </div>
                        }
                        {
                            loading &&
                            <div className="modal-footer" class="mt-10 w-full flex justify-center">
                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        }

                    </div>
                </div>
            </div>



        </>
    )
}

export default FileUploadModal