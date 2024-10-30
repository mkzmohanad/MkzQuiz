import { useState } from "react";

import { useToggleModal } from "../../Hooks/useToggleModal";
import { useDeleteUser } from "./useDeleteUser";
import { useGetAllUsers } from "./useGetAllUsers";

import ConfirmModal from "../../UI/ConfirmModal";
import Header from "../../UI/Header";
import Loading from "../../UI/Loading";
import WelcomingUser from "../User/WelcomingUser";
import EachUser from "./EachUser";
import NoResults from "../../UI/NoResults";

function UpdateAllUsers() {
    const [userToDelete , setUserToDelete] = useState()

    const {users , isLoadingUsers} = useGetAllUsers();
    const {deleteUser , isDeleting} = useDeleteUser()
    const {toggleModal , handleSetToggleModal} = useToggleModal();
    
    if(isLoadingUsers || isDeleting) return <Loading />
    const allUsers = users.data.docs

    let numberOfNormalUsers = 0;
    allUsers.forEach((user) => {user.role !== "admin" && numberOfNormalUsers++});

    return <main>
        {toggleModal ? <ConfirmModal 
        handleSetToggleModal = {handleSetToggleModal} 
        warningMessage="are you sure you want to delete that user? " 
        actionName ="yes, delete now"
        functionToPerform={()=>deleteUser(userToDelete)}/> : ""}
        <Header />
        <div className="py-10 px-5 md:px-10 flex flex-col gap-8 h-dvh">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <WelcomingUser />
                <p className="text-lightColor mt-5 md:mt-24 text-lg md:text-xl font-bold capitalize italic">number of users: {numberOfNormalUsers}</p>
            </div>
            <ul className="h-full w-full bg-darkColor mx-auto rounded-md py-7 px-3 lg:p-7 space-y-7 sm:space-y-16 overflow-y-scroll overflow-x-hidden">
                {numberOfNormalUsers > 0 ? allUsers.map((user) => user.role !== "admin" ? <EachUser 
                key={user._id} 
                userData = {user} 
                handleSetToggleModal ={handleSetToggleModal} 
                setUserToDelete = {setUserToDelete} /> : "" ) 
                : <NoResults>no users to show!</NoResults>}
            </ul>
        </div>
    </main>
}
export default UpdateAllUsers;