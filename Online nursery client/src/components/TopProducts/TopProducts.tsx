import { useGetProductsQuery } from "@/redux/api/api";
import ProductCard from "../AllCard/ProductCard";


const TopProducts = () => {
    const {data , isLoading} = useGetProductsQuery([]);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen mt-10">
            <p className="text-4xl text-green-500">Loading...</p>
        </div>
    );
      }
    console.log(data);

    const { data: products } = data ;
    return (
        <div className="my-10 md:my-16">
            <div>
            <h2 className="text-2xl my-4 md:text-4xl font-bold text-center ">Best selling <span className="text-green-600">Products</span></h2>
            {/* <h5 className="text-base md:text-xl mt-6  mb-2 font-bold text-center">Our top demanding products</h5> */}
            <hr className="border-2 border-green-600 w-5/12 md:w-1/12 mx-auto"/>
            </div>

            <ProductCard products={products}/>
        </div>
    );
};

export default TopProducts;