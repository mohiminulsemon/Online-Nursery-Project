import { useGetCategoriesQuery } from "@/redux/api/api";
import { TCategories } from "@/types";
import { Link, useParams } from "react-router-dom";
import AllProductsByCategory from "./AllProductsByCategory";

const CategorySideBar = () => {
  const { name: currentCategory } = useParams<{ name: string }>(); // Get the current category from the URL
  const { data, isLoading } = useGetCategoriesQuery({});
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <p className="text-4xl text-green-500">Loading...</p>
      </div>
    );
  }
  
  const { data: categories } = data;

  // Filter unique categories by name
  const uniqueCategories = categories?.reduce((acc: TCategories[], current: TCategories) => {
    if (!acc.find((item) => item.name === current.name)) {
      acc.push(current);
    }
    return acc;
  }, []);

  return (
    <div className="flex gap-1 md:gap-4 my-10">
      <div className="w-1/3 md:w-1/6">
        {uniqueCategories?.map((category: TCategories) => (
          <div key={category._id} className="px-2 py-1 md:p-4 font-serif ">
            <Link to={`/allcategories/allproductscategory/${encodeURIComponent(category.name)}`}>
            { category.name === currentCategory ? 
           <div className="flex flex-col  "> 
           <p className="text-sm md:text-lg font-bold text-green-900 bg-green-100 rounded px-1 md:px-4 py-2  transform hover:scale-105 transition-transform duration-300 text-start">{category.name}</p>
           <img className="hidden md:block text-center h-60 transform hover:scale-105 transition-transform duration-300 mt-2" src={category.imageUrl} alt="" />
           <p className="hidden md:block">{category.description.slice(0,100)}...</p>
           </div>
            :
            
            <p className="text-sm md:text-lg font-bold text-black">{category.name}</p>}
            </Link>
          </div>
        ))}
      </div>
      <div className="w-2/3 md:w-5/6">
      <div className="text-lg  font-serif  md:text-3xl font-bold uppercase md:mb-6"> {currentCategory} <span className="text-green-600">all products</span></div>
        <AllProductsByCategory />
      </div>
    </div>
  );
};

export default CategorySideBar;
