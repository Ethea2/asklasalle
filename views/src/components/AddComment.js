const AddComment = () => {
    return (  
        <div className="addComment-container" class="p-4 bg-gray-300">
            <div className="header" class="flex flex-row justify-between">
                <h1 class="text-lg font-bold">Reply...</h1>
                <div className="edit-delete" class="flex justify-evenly">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
            <div className="body">
                <textarea placeholder="Type your reply here..."/>
            </div>
            <div className="footer">
                <button>Cancel</button>
                <button>Post</button>
            </div>
        </div>
    )}
 
export default AddComment;