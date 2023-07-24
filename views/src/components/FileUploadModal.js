import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'

const FileUploadModal = ({ close, data }) => {
    const [img, setImg] = useState([])
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
        try {
            // console.log(img)
            // const imageData = {
            //     "img" : img
            // }
            const form = new FormData()
            form.append("img", img)
            form.append("_method", "PATCH")
            axios.post('/api/user/' + data[0]._id + "/picture", form).then((data) => {
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
                            <input onChange={handleImage} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

                        </div>

                        <div className="modal-footer" class="mt-10 w-full flex justify-between">
                            <button onClick={handleSubmit} class="px-4 py-2 bg-mint text-white rounded-lg">Save changes</button>
                            <button onClick={close} class="px-4 py-2 bg-red-400 text-white rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default FileUploadModal