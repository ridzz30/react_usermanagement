import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function EditModel({ item, index, setMessage, getUser }) {
    const [username, setUserName] = useState('')

    useEffect(()=>{
        setUserName(item.username)
    },[item])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`/users/${item.id}`, { username }).then(({ data }) => {
                if(data?.message){
                    setMessage("success", data?.message ?? "Something Went Wrong")
                    getUser()
                }else{
                    setMessage("error", data?.message ?? "Something Went Wrong")
                }
            })
        }
        catch (error) {
            console.error(error)
            setMessage("error", error?.response?.data?.message ?? "Something Went Wrong")
        }
    }

    return (
        <>
            <button type="button" className="btn btn-success ml-2" data-toggle="modal" data-target={`#addEditModal${index}`}><FaEdit /></button>
            <div className="modal" id={`addEditModal${index}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <div class="form-group">
                                    <label for="username">User Name:</label>
                                    <input type="text" class="form-control" placeholder="Enter User Name" id="username" 
                                        onChange={(e)=>{
                                            setUserName(e.target.value)
                                        }}
                                        value={username} 
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" class="btn btn-primary">Submit</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditModel;
