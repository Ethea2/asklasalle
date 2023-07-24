import { useState } from "react";

const EditCommentModal = ({close, onClose, show, data}) => {

    const [body,setBody] = useState('')
    const [error, setError] = useState(null)

    if(!show){
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const profile = {body}

        const response = await fetch('/api/askposts/' + data, {
            method: 'PATCH',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }

        if(response.ok){
            setDisplayName('')
            setBio('')
            setError(null)
            onClose()
            console.log('user profile updated successfully!')
            
        }
    }

    return (

        <div className="modal" class="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-content" class="w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                <div className="modal-header" class="px-10 py-6 bg-teal rounded-t-2xl border        border-black">
                    <h3 className="modal-title" class="m-0 text-white">Edit Reply</h3>
                </div>

                <div className="modal-body" class="px-10 py-8 border-l border-r border-black">
                    <div className="edit-body" class="flex flex-col gap-0.5 mt-2">
                        <label htmlFor="body">Your reply:</label>
                        <textarea type="text" required="" class="border border-neutral-500 rounded-lg" onChange={(e) => setBody(e.target.value)} value={body}/>
                    </div>
                    
                    {error && <div className="error">
                            {error}
                    </div>}
                    
                    <div className="modal-footer" class="mt-10 w-full flex justify-between">
                        <button onClick={handleSubmit} class="px-4 py-2 bg-mint text-white rounded-lg">Save changes</button>
                        <button onClick={close} class="px-4 py-2 bg-red-400 text-white rounded-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>

)}
 
export default EditCommentModal;