const AddComment = () => {
    return (  
        <div className="addComment-container" class="px-8 py-4 bg-gray-300 rounded-2xl">
            <div className="header" class="flex flex-row justify-between">
                <h1 class="text-lg font-bold">Reply...</h1>
                <div className="edit-delete" class="flex gap-4">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className="body" class="w-full">
                <textarea placeholder="Type your reply here..." class="w-full rounded-lg p-4 mt-4"/>
            </div>
            <div className="footer" class="mt-4 mb-2 flex justify-start gap-8">
                <button>Cancel</button>
                <button>Post</button>
            </div>
        </div>
    )}
 
export default AddComment;