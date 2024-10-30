import tw from "tailwind-styled-components"
import { HiOutlineArrowRightOnRectangle, HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineBarChart } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useLogout } from "../Features/Auth/useLogout";
import { useToggleModal } from "../Hooks/useToggleModal";
import { useUserReset } from "../Features/User/useUserReset";
import { useUserAccount } from "../Features/User/useUserAccount";

import Logo from "./Logo";
import MiniSpinner from "./MiniSpinner"
import SettingMenu from "./SettingsMenu";
import DeleteAndUpdateConfirmation from "./DeleteAndUpdateConfirmation";
import ConfirmModal from "./ConfirmModal";
import Loading from "./Loading";

const ListItem = tw.li`
    text-white 
    text-2xl 
    cursor-pointer
`

function Header() {
    const navigate = useNavigate();

    const {toggleModal : toggleDeleteMeModal , handleSetToggleModal : handleSetToggleDeleteMeModal} = useToggleModal()
    const {toggleModal : toggleResetMeModal , handleSetToggleModal : handleSetToggleResetMeModal} = useToggleModal();

    const {logout , isLoggingOut} = useLogout()
    const {reset , isResetting} = useUserReset();
    const {user , isLoadingUser} = useUserAccount();
    
    if(isLoadingUser || isResetting) return <Loading />
    const {role} = user.data.data

    function handleLogout() {
        logout()
    }

    return <>
        {toggleDeleteMeModal ? <DeleteAndUpdateConfirmation type = "delete" handleSetToggleModal = {handleSetToggleDeleteMeModal}/> : ""}
        {toggleResetMeModal ? <ConfirmModal 
            handleSetToggleModal = {handleSetToggleResetMeModal} 
            warningMessage="are you sure you want to reset all of your data? " 
            actionName ="yes, reset now"
            functionToPerform={reset}/> : ""}

        <header className="flex items-center justify-between py-3 px-12 md:px-24 bg-darkColor fixed top-0 z-10 w-full">
            <Logo size="small" />
            <ul className="flex items-center gap-4">
                {
                    role === "user" && <>
                    <ListItem onClick={ () => navigate("/") }><HiOutlineUserCircle /></ListItem>
                    <ListItem onClick={ () => navigate("/leaderboard") }><MdOutlineBarChart /></ListItem>
                </>
                }
                <ListItem>
                    <SettingMenu handleSetToggleDeleteMeModal = {handleSetToggleDeleteMeModal} 
                    handleSetToggleResetMeModal = {handleSetToggleResetMeModal}/>
                </ListItem>
                {
                    !isLoggingOut ? <ListItem onClick={() => handleLogout() }><HiOutlineArrowRightOnRectangle /></ListItem>
                    : <ListItem> <MiniSpinner /> </ListItem>
                }
                
            </ul>
        </header>
    </>
}
export default Header;
