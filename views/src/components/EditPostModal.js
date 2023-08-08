import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"

const EditPostModal = ({ close, show, onClose, data }) => {
    const apiUrl =
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_URL_PRODUCTION
            : process.env.REACT_APP_URL_DEV
    const { user } = useAuthContext()
    const [title, setTitle] = useState(data.title)
    const [body, setBody] = useState(data.body)
    const [error, setError] = useState(null)

    if (!show) {
        return null
    }

    const handleSave = async (e) => {
        e.preventDefault()

        const post = { title, body }

        const response = await fetch(apiUrl + '/api/askposts/' + data._id, {
            method: 'PATCH',
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setTitle('')
            setBody('')
            setError(null)
            onClose()
        }
    }

    return (
        <form className="patch">
            <div className="modal fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="modal-content w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                    <div className="modal-header px-10 py-6 bg-teal rounded-t-2xl border border-black">
                        <h3 className="modal-title m-0 text-white">Edit Post</h3>
                    </div>
                    <div className="modal-body px-10 py-8 border-l border-r border-black">
                        <div className="edit-displayName flex flex-col gap-0.5 mb-2">
                            <label htmlFor="displayName">Title</label>
                            <input type="text" required className="border border-neutral-500 rounded-lg" onChange={(e) => setTitle(e.target.value)} value={title} />
                        </div>
                        <div className="edit-bio flex flex-col gap-0.5 mt-2">
                            <label htmlFor="bio">Body</label>
                            <textarea type="text" required className="resize-none w-full h-52 p-2 border border-neutral-500 rounded-lg" onChange={(e) => setBody(e.target.value)} value={body} />
                        </div>
                        {error && <div className="error">
                            {error}
                        </div>}
                        <div className="modal-footer mt-8 rounded-b-2xl flex justify-between">
                            <button onClick={handleSave} className="bg-mint text-white px-4 py-2 rounded-lg">Save changes</button>
                            <button onClick={close} class="px-4 py-2 bg-red-400 text-white rounded-lg">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default EditPostModal;
