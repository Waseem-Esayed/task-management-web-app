import { Outlet } from "react-router-dom"
import ThemeHandler from "./ThemeHandler";
import Navbar from "./Navbar";

const RootLayout = () => {
  return (
    <>
      <ThemeHandler />
      <Navbar />
      <Outlet />
    </>
  )
}

export default RootLayout;