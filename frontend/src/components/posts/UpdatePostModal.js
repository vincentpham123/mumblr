import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { Modal } from "../Context/Modal";
import UpdatePost from "./UpdatePost";
// import NewTextPost from "./NewTextPost";
const UpdatePostModal = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const sessionUser = useSelector(state=>  state.session.user);
    

    return (
        <>
        <Modal >
            <UpdatePost  />
        </Modal>

        
        </>
    )

    
}

export default UpdatePostModal;