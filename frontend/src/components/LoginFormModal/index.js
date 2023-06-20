import LoginForm from "./LoginForm";
import { useState } from "react";
import { Modal } from "../Context/Modal";
const LoginFormModel =()=>{
    const [showModal,setShowModal] = useState(false);
    return(
        <>
        <button className='sign-in-button' onClick={()=>setShowModal(true)}>Log In</button>
        {showModal && (
            <Modal onClose={()=>setShowModal(false)}>
                <LoginForm setshowModal={setShowModal}/>
            </Modal>
        )}
        </>
    )
}

export default LoginFormModel;