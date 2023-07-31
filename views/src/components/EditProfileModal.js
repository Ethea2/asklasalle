import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const EditProfileModal = ({close, onClose, show, data}) => {

    const [displayName, setDisplayName] = useState(data[0].displayName)
    const [bio, setBio] = useState(data[0].bio)
    const [error, setError] = useState(null)
    const { user } = useAuthContext()

    const navigate = useNavigate();
    
    
    if(!show){
        return null
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const profile = {displayName, bio}

        console.log('/api/user/' + data[0]._id)
        const response = await fetch('/api/user/' + data[0]._id, {
            method: 'PATCH',
            body: JSON.stringify(profile),
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${user.token}`
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
    return(

        <>
        
            <div className="modal" class="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="modal-content" class="w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                    <div className="modal-header" class="px-10 py-6 bg-teal rounded-t-2xl border        border-black">
                        <h3 className="modal-title" class="m-0 text-white">Edit User Profile</h3>
                    </div>

                    <div className="modal-body" class="px-10 py-8 border-l border-r border-black">
                            <div className="edit-displayName" class="flex flex-col gap-0.5 mb-2">
                                <label htmlFor="displayName">Display Name</label>
                                <input type="text" required="" class="border border-neutral-500 rounded-lg" onChange={(e) => setDisplayName(e.target.value)} value={displayName}/>
                            </div>

                            <div className="edit-bio" class="flex flex-col gap-0.5 mt-2">
                                <label htmlFor="bio">Bio</label>
                                <input type="text" required="" class="border border-neutral-500 rounded-lg" onChange={(e) => setBio(e.target.value)} value={bio}/>
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
       

        
        </>
    )
}

export default EditProfileModal