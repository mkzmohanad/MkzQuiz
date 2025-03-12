import { Outlet } from "react-router-dom";

function AppLayout() {

    return  <div className="bg-darkestColor h-dvh">
        <Outlet/>
    </div>
}

export default AppLayout;
