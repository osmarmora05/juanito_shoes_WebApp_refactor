import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function LayoutDashboard() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
