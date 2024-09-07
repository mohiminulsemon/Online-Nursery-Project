import { VscOpenPreview } from "react-icons/vsc";
import { FaArrowRight, FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { TProducts } from "@/types";
import { toast } from "sonner";
import { useState } from "react";
const ProductCard = ({ products }: { products: TProducts[] }) => {


    //console.log(products)

    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
       
        const handleAddToCart = (product: TProducts) => {
        const storedCart = localStorage.getItem("cart");
        const cart = storedCart ? JSON.parse(storedCart) : [];
        const existingItem = cart.find((item: TProducts) => item._id === product._id);

        if (existingItem) {
            if (existingItem.quantity < product.quantity) {
                const updatedCart = cart.map((item: TProducts) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                toast.success("Product added to cart");
                setCart(updatedCart);
            } else {
                toast.error("Maximum quantity reached");
            }
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        }
        toast.success("Product added to cart");
        navigate("/cart");
    };
    return (
        <div className="my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products?.slice(0, 7)?.map((item: TProducts) => (
                    <div className="rounded-2xl mb-5 " key={item._id}>
                        <div className="relative group bg-orange-50">
                            <Link to={`/allproducts/${item._id}`}>
                                <img src={item.imageUrl} alt={item.title} className="w-full h-80 transform hover:scale-105 transition-transform duration-300" />
                            </Link>
                            <div className="absolute inset-0 flex items-center justify-center gap-4 top-3/4 bg-green-200 bg-opacity-20 opacity-0 group-hover:opacity-90 hover:text-green-600 transition-opacity duration-300">
                                {/* <FaRegHeart className="text-2xl hover:bg-green-800 hover:text-white hover:rounded-full hover:p-[7px] " title="Add To Rating"/> */}
                                <Link to={`/allproducts/${item._id}`}>
                                    < VscOpenPreview className="text-2xl transform hover:scale-150 transition-transform duration-300" title="View Details" />
                                </Link>
                                <button 
                                onClick = {() => handleAddToCart(item)}
                                >
                                    <IoCartOutline className="text-2xl transform hover:scale-150 transition-transform duration-300" title="Add To Cart" />
                                </button>
                            </div>
                            <div className="absolute flex items-center justify-center gap-1 top-4 right-4 ">
                                <FaRegHeart className="text-center text-xl mt-1" />
                                <h5 className="text-xl font-semibold">{item.rating}</h5>
                            </div>
                        </div>
                        <h3 className="text-center mt-4 font-bold text-black text-lg">{item.title}</h3>
                        <p className="text-center font-bold  text-md  text-green-700">$ {item.price}</p>
                    </div>
                ))}

                <Link to={"/allproducts"} >
                    <div className="flex items-center justify-center gap-4 my-20 md:my-0 md:mt-28 hover:animate-wobble ">
                        <button className="relative flex items-center justify-center border-2 border-green-800 text-green-900  px-6 py-3 rounded-full w-20 h-20 bg-white shadow-lg transition duration-300">


                        </button>
                        <h1 className="absolute font-semibold text-xl  ml-6 mr-4 bg-white py-1">
                            View More Products
                        </h1>
                        <FaArrowRight className="  text-green-900 text-lg mt-1 ml-36" />
                    </div>
                </Link>

            </div>
        </div>
    );
};

export default ProductCard;