import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    IconButton,
    Typography,
  } from "@material-tailwind/react";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useUserAccount } from "../Features/User/useUserAccount";
import Loading from "./Loading";
import { IoIosWarning } from "react-icons/io";
   
function SettingMenu({handleSetToggleDeleteMeModal , handleSetToggleResetMeModal}) {
  const navigate = useNavigate();

  const {user , isLoadingUser} = useUserAccount();
    
  if(isLoadingUser) return <Loading />
  const {role} = user.data.data

  function handleDeleteMyAccount() {
    handleSetToggleDeleteMeModal()
  }

  return (  <>
      <Menu className="" animate={{
        mount: { y: 0 },
        unmount: { y: 25 },
      }}>
        <MenuHandler >
          <IconButton variant="text" className="text-lightColor w-[24px] h-[24px]">
            <HiOutlineCog6Tooth className="w-[24px] h-[24px]"/>
          </IconButton>
        </MenuHandler>
        
        <MenuList className="flex flex-col gap-2 bg-darkColor border-[1px] border-mediumColor text-lightColor">
          {role === "user" && <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={() => navigate("/updateAccount")}>
            <Typography className="text-base active:bg-red-500">update user info</Typography>
          </MenuItem>}

          {role === "admin" && <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={() => navigate("/admin/updateAccount")}>
            <Typography className="text-base">update user info</Typography>
          </MenuItem>}

          {role === "user" && <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={handleSetToggleResetMeModal}>
            <Typography className="text-base">clear data</Typography>
          </MenuItem>}

          {role === "admin" && <>
            <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={() => navigate("/admin/updateAllUsers")}>
              <Typography className="text-base flex items-center gap-2">update all users <IoIosWarning className="text-2xl" /></Typography>
            </MenuItem>

            <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={() => navigate("/admin/updateQuizQuestions")}>
              <Typography className="text-base flex items-center gap-2">update quiz questions <IoIosWarning className="text-2xl" /></Typography>
            </MenuItem>
          </>}

          <MenuItem className="flex items-center justify-center gap-4 py-2 px-2 capitalize" onClick={handleDeleteMyAccount}>
            <Typography className="text-base">delete account</Typography>
          </MenuItem>
          
        </MenuList>
      </Menu>
    </>
  );
}

export default SettingMenu;