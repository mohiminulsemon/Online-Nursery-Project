
import { TCategories } from "@/types";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const CategoryCard = ({ categories }: {categories : TCategories[] }) => {
    
   console.log(categories)
    return (
        <div className="my-10 md:my-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {categories?.slice(0, 7)?.map((item : TCategories, index : number) => (
                    <div className={`rounded-2xl mb-5 ${index % 2 === 0 ? 'translate-y-0 md:translate-y-10' : 'translate-y-0 md:-translate-y-10'}`}
                        key={item._id}>
                        <div className="relative group">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-96 px-2 transform hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center gap-4 top-3/4 bg-green-200 bg-opacity-20  ">
                                <div className="flex justify-center items-center gap-1 hover:animate-wobble" title="Show more">
                                <Link to={"/allcategories/allproductscategory/" + item.name} >
                               <div className="flex justify-center items-center gap-1 hover:animate-wobble" title="Show more">
                                    <h1 className="text-xl text-gray-600">{item.name} </h1>
                                    <FaArrowRight className="text-2xl text-gray-600 mt-1" />
                                </div>
                               </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
                <Link to={"/allcategories"}>
                <div className="flex items-center justify-center gap-4 my-20 md:my-0 md:mt-44 hover:animate-wobble">
                        <button className="relative flex items-center justify-center border-2 border-green-800 text-green-900  px-6 py-3 rounded-ss w-20 h-20 bg-white shadow-lg transition duration-300">


                        </button>
                        <h1 className="absolute font-semibold text-xl  ml-6 mr-4 bg-white py-1">
                            View More Categories
                        </h1>
                        <FaArrowRight className="  text-green-900 text-lg mt-1 ml-36" />
                    </div>
                </Link>
            </div>
        </div>



    );
};

export default CategoryCard;