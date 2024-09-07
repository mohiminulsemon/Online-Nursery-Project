// 
import Footer from "@/pages/shared/Footer";
import Navbar from "@/pages/shared/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="text-green-900">
      {/* text-[#11522c] */}
      <Navbar></Navbar>
      <Outlet ></Outlet>
      <Footer></Footer>

    </div>
  );
};
export default MainLayout;
