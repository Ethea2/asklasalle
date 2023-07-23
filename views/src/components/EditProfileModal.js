const EditProfileModal = props => {

    if(!props.show){
        return null
    }
    return(
        <div className="modal" class="fixed left-0 top-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="modal-content" class="w-2/5 bg-white rounded-2xl drop-shadow-2xl">
                <div className="modal-header" class="px-10 py-6 bg-teal rounded-t-2xl border border-black">
                    <h3 className="modal-title" class="m-0 text-white">Edit User Profile</h3>
                </div>
                <div className="modal-body" class="px-10 py-8 border-l border-r border-black">
                    <div className="edit-displayName" class="flex flex-col gap-0.5 mb-2">
                        <label htmlFor="displayName">Display Name</label>
                        <input type="text" required="" class="border border-neutral-500 rounded-lg"/>
                    </div>
                    <div className="edit-bio" class="flex flex-col gap-0.5 mt-2">
                        <label htmlFor="bio">Bio</label>
                        <input type="text" required="" class="border border-neutral-500 rounded-lg"/>
                    </div>
                </div>
                <div className="modal-footer" class="px-10 py-6 border-b border-l border-r border-black rounded-b-2xl">
                    <button onClick={props.onClose} class="bg-mint text-white px-4 py-2 rounded-lg">Save changes</button>
                </div>
            </div>
        </div>
    )
}

export default EditProfileModal