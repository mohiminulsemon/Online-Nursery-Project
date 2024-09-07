import AllCategoryCard from "@/components/AllCard/AllCategoryCard";
import ScrollToTopButton from "../Home/ScrollToTopButton";
import { Link, Outlet, useLocation } from "react-router-dom";


const AllCategories = () => {
    const location = useLocation();
   const noAllCategory = location.pathname.endsWith("allcategories");
    return (
        <div className="">
            <div className="hidden md:flex items-center justify-between bg-green-50 mx-6">
                <div className="mx-6 ">
                    <h5 className="font-jost text-base font-medium md:pb-2 tracking-widest text-green-900 mt-6 uppercase">NatureNEst Categories</h5>
                    <h1 className="text-3xl md:text-6xl font-bold md:mb-2 text-green-900 ">Explore More <br /> Categories</h1>
                    <p className="font-jost text-lg font-medium md:pb-2 tracking-wider text-black mt-6">Choose the right category and get plant for you. <br /> That Helps to heal life.</p>
                </div>
                <div className="flex ">
                    <img src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-10-1.jpg" className="md:h-[49vh] lg:h-[70vh] md:w-[42vh] lg:w-[50vh]" alt="" />  
                    <img src="https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/banner-10-3.jpg" className="h-[70vh] w-[70vh] md:hidden  lg:flex" alt="" />
                </div>
            </div>
            <div className="flex md:hidden flex-col items-center justify-center">
                <div className="relative w-full h-[50vh] md:h-[60vh] bg-no-repeat bg-center bg-cover"
                    style={{
                        backgroundImage: `url("https://wpbingosite.com/wordpress/flacio/wp-content/uploads/2021/12/slider-10-8.jpg")`,
                        opacity: "0.9",

                    }}>
                    <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">

                      <Link to={"/allcategories"} className="text-3xl font-bold text-green-900 uppercase">
                      <h2 className="text-3xl md:text-6xl font-bold md:mb-2 text-green-900 text-center">
                            Explore More Categories
                        </h2>
                        <h5 className="font-jost text-sm md:text-lg font-medium md:pb-2 tracking-widest text-black mt-2">That Helps to heal life.</h5>
                      </Link>
                    </div>
                </div>
            </div>
           {
            noAllCategory ?  <AllCategoryCard /> : <Outlet />
           }
        
            
            <ScrollToTopButton />
        </div>
    );
};

export default AllCategories;