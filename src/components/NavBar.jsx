import { Outlet } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <h1>HOli</h1>
      <Outlet />
    </nav>
  );
}