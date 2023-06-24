import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { createPost } from "../../../store/posts";
import { Modal } from "../../Context/Modal";
import NewTextPost from "./NewTextPost";
const NewTextModal = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const sessionUser = useSelector(state=>  state.session.user);
    

    return (
        <>
        <Modal >
            <NewTextPost  />
        </Modal>

        
        </>
    )

    
}

export default NewTextModal;