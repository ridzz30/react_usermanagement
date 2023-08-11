import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";

function DeleteModel({ item, index, setMessage, getUser }) {

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`/users/${item.id}`).then(({ data }) => {
                console.log("response", data)
                if (data?.message) {
                    setMessage("success", data?.message ?? "Something Went Wrong")
                    getUser()
                } else {
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
            <button type="button" className="btn btn-danger ml-2" data-toggle="modal" data-target={`#deleteModal${index}`}><AiTwotoneDelete /></button>
            <div className="modal" id={`deleteModal${index}`}>
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Delete User</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <h4>Are you sure to delete this item?</h4>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" onClick={handleSubmit}>Submit</button>
                            <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DeleteModel;
