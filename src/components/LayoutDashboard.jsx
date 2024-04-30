import '../css/dashboard.css'
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function LayoutDashboard() {
  return (
    <div className="dashboard">
      <NavBar />
      <div className="dashboard__pages">
        <Outlet />
      </div>
    </div>
  );
}
