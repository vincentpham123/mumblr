import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux";
import NewPhotoText from "./NewPhotoPost";
import { Modal } from "../Context/Modal";
// import 
const NewPhotoModal = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const sessionUser = useSelector(state=>  state.session.user);
    

    return (
        <>
        <Modal >
            <NewPhotoText  />
        </Modal>

        
        </>
    )

    
}

export default NewPhotoModal;