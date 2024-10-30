import ConfirmPasswordForDeleteAndUpdate from "./ConfirmPasswordForDeleteAndUpdate";
import Overlay from "./Overlay";

function DeleteAndUpdateConfirmation({type , handleSetToggleModal , updatedData}) {
    return <Overlay >
        <ConfirmPasswordForDeleteAndUpdate type = {type} handleSetToggleModal={handleSetToggleModal} updatedData = {updatedData} />
    </Overlay>
}
export default DeleteAndUpdateConfirmation;

