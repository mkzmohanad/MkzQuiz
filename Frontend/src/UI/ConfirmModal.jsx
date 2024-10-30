import { IoMdCloseCircle } from "react-icons/io";

import Overlay from "./Overlay";
import Button from "./Button";

function ConfirmModal({handleSetToggleModal , warningMessage , actionName , functionToPerform}) {

    function handleConfirmModal() {
        handleSetToggleModal();
        functionToPerform()
    }

    return  <Overlay>
        <div className="w-full sm:w-5/6 lg:w-2/3 h-1/2 relative">
            <div className="absolute right-0 text-5xl p-5 ">
                <IoMdCloseCircle className="cursor-pointer" onClick={handleSetToggleModal}/>
            </div>
            <div className="flex flex-col justify-center gap-14 bg-mediumColor pt-24 pb-8 px-4 sm:px-10 z-50 rounded-lg">
                <h1 className = "font-extrabold text-darkestColor text-xl sm:text-3xl text-center capitalize">{warningMessage || "Are you sure you want to perform this action?"}</h1>
                <div className="flex items-center flex-col sm:flex-row justify-center gap-6 w-full">
                    <Button onClick = {handleConfirmModal} size="primary" variation="danger">{actionName || "perform now"}</Button>
                    <Button onClick = {handleSetToggleModal} size="primary" variation="back">cancel it</Button>
                </div>
            </div>
        </div>
    </Overlay>
}

export default ConfirmModal;